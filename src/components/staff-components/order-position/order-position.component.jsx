import React from "react";
import "./order-position.styles.scss";
import {
  changeStatusToServed,
  removeOrdered,
} from "../../../redux/orders/orders.actions";
import { connect } from "react-redux";

const OrderPosition = ({
  orderPosition,
  isForKitchen = false,
  isServed = false,
  changeStatusToServed,
  removeOrdered,
}) => {
  const { positionName, quantity, tableID, date } = orderPosition;
  let hour = String(date.toDate().toLocaleTimeString());

  return (
    <div
      className={
        !isServed || isForKitchen
          ? "background-not-served"
          : "background-served"
      }
    >
      <div className={`order-position`}>
        <h2 className="position-name">{positionName}</h2>
        {isForKitchen ? (
          <div className="position-data">
            <span className="info">Qty: {quantity}</span>
            <span className="info">TABLE: {tableID}</span>
            <span className="info">{hour}</span>
          </div>
        ) : null}
        {!isServed ? (
          <>
            <div
              className="remove-button"
              onClick={() => {
                removeOrdered(orderPosition);
              }}
            >
              &#10005;
            </div>
            <div
              className="change-status-button"
              onClick={() => {
                changeStatusToServed(orderPosition);
              }}
            >
              &#10003;
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeStatusToServed: (item) => dispatch(changeStatusToServed(item)),
  removeOrdered: (item) => dispatch(removeOrdered(item)),
});

export default connect(null, mapDispatchToProps)(OrderPosition);
