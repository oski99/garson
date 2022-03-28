import React from "react";
import { connect } from "react-redux";
import {
  selectCartPositionsServed,
  selectCartPositionsPriceSumUp,
} from "../../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import CartPosition from "../cart-position/cart-position.component";
import "./cart-list-served.styles.scss";
import StripeButton from "../../stripe-button/stripe-button.component";

const CartListServed = ({ cartPositionsServed, sumUp }) => {
  return (
    <div className="cart-list">
      {cartPositionsServed.length ? (
        <>
          <h1>bill:</h1>
          {cartPositionsServed.map((position) => (
            <CartPosition key={position.id} cartPosition={position} />
          ))}
          <div className="total">
            <h1>Total: </h1>
            <h1>{sumUp}</h1>
          </div>
          <StripeButton price={sumUp}></StripeButton>
        </>
      ) : null}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  cartPositionsServed: selectCartPositionsServed,
  sumUp: selectCartPositionsPriceSumUp,
});

export default connect(mapStateToProps)(CartListServed);
