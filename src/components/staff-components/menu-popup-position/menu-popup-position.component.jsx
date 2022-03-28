import React from "react";
import "./menu-popup-position.styles.scss";
import CustomButton from "../../custom-button/custom-button.component";
import { addNewOrder } from "../../../redux/orders/orders.actions";
import { connect } from "react-redux";

const MenuPopupPosition = (props) => {
  const { position, tableID, addNewOrder } = props;
  return (
    <div className="menu-popup-position">
      <h1 className="position-name">{position.positionName}</h1>
      <CustomButton onClick={() => addNewOrder({ tableID, position })}>
        add
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addNewOrder: (item) => dispatch(addNewOrder(item)),
});

export default connect(null, mapDispatchToProps)(MenuPopupPosition);
