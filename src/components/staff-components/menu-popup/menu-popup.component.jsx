import React from "react";
import "./menu-popup.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectMenuPositions } from "../../../redux/menu/menu.selectors";
import { connect } from "react-redux";
import MenuPopupPosition from "../menu-popup-position/menu-popup-position.component";

const MenuPopup = (props) => {
  let { trigger, tableID, menuPositions } = props;

  return trigger ? (
    <div className="popup-inner">
      {menuPositions.map((item) => (
        <MenuPopupPosition key={item.id} position={item} tableID={tableID} />
      ))}
    </div>
  ) : null;
};
const mapStateToProps = createStructuredSelector({
  menuPositions: selectMenuPositions,
});

export default connect(mapStateToProps)(MenuPopup);
