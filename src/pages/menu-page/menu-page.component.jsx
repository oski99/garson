import React from "react";
import MenuList from "../../components/customer-components/menu-list/menu-list.component";
import Toolbar from "../../components/customer-components/toolbar/toolbar.component";
import "./menu-page.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMenuData } from "../../redux/menu/menu.selectors";
import { updateMenu } from "../../redux/menu/menu.actions";

// import { addMenu } from "../../firebase/firebase.utils";
// import MENU_DATA from "../../redux/menu/menu.data";

class MenuPage extends React.Component {
  unsubscribeFromSnapshot = null;

  // componentDidMount() {
  //   addMenu(
  //     "menu",
  //     Object.keys(MENU_DATA).map((key) => MENU_DATA[key])
  //   );
  // }
  render() {
    const { menuData } = this.props;
    return (
      <div className="menu-page">
        <Toolbar />
        {menuData.map((section) => (
          <div key={section.id}>
            <h1 className="category-name">{section.category.toUpperCase()}</h1>
            <MenuList items={section.items}></MenuList>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  menuData: selectMenuData,
});

const mapDispatchToProps = (dispatch) => ({
  updateMenu: (menuMap) => dispatch(updateMenu(menuMap)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
