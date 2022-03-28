import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MenuPage from "./pages/menu-page/menu-page.component";
import CartPage from "./pages/cart-page/cart-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import OrdersPage from "./pages/orders-page/orders-page.component";
import OrdersKitchenPage from "./pages/orders-kitchen-page/orders-kitchen-page.component";

import { createStructuredSelector } from "reselect";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import { fetchMenuStartAsync } from "./redux/menu/menu.actions";
import {
  fetchPositionsOrderedAsync,
  fetchPositionsServedAsync,
} from "./redux/cart/cart.actions";
import { convertPathTableID } from "./constants";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {
      setCurrentUser,
      fetchMenuStartAsync,
      fetchPositionsOrderedAsync,
      fetchPositionsServedAsync,
    } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    const tableID = convertPathTableID(
      window.location.pathname.split("/", 2)[1]
    );
    fetchPositionsOrderedAsync(tableID);
    fetchPositionsServedAsync(tableID);
    fetchMenuStartAsync();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/:tableID/menu" element={<MenuPage />} />
            <Route path="/:tableID/cart" element={<CartPage />} />

            {this.props.currentUser ? (
              <>
                <Route exact path="/orders" element={<OrdersPage />} />
                <Route exact path="/kitchen" element={<OrdersKitchenPage />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/signin" />} />
            )}
            {!this.props.currentUser ? (
              <Route path="/signin" element={<SignInPage />} />
            ) : (
              <Route path="*" element={<Navigate to="/orders" />} />
            )}
          </Routes>
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchMenuStartAsync: () => dispatch(fetchMenuStartAsync()),
  fetchPositionsOrderedAsync: (tableID) =>
    dispatch(fetchPositionsOrderedAsync(tableID)),
  fetchPositionsServedAsync: (tableID) =>
    dispatch(fetchPositionsServedAsync(tableID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
