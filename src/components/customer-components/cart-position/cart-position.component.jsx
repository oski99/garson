import React from "react";
import "./cart-position.styles.scss";
import { connect } from "react-redux";
import {
  deletePositionFromCart,
  removePosition,
  addPosition,
} from "../../../redux/cart/cart.actions";

const CartPosition = ({
  editable = false,
  cartPosition,
  addPosition,
  removePosition,
  deletePositionFromCart,
}) => {
  const { positionName, quantity, price } = cartPosition;
  return (
    <div className="cart-position">
      <h2 className="position-name">{positionName}</h2>
      <span className="position-price">Price: {price}</span>
      <span className="position-qty">
        <span className="qty-label"> Quantity:</span>
        {editable ? (
          <div className="arrow" onClick={() => removePosition(cartPosition)}>
            &#10094;
          </div>
        ) : null}

        <span className="qty-value">{quantity}</span>
        {editable ? (
          <div
            className="arrow"
            onClick={() => {
              addPosition(cartPosition);
            }}
          >
            &#10095;
          </div>
        ) : null}
      </span>
      {editable ? (
        <div
          className="remove-button"
          onClick={() => {
            deletePositionFromCart(cartPosition);
          }}
        >
          &#10005;
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deletePositionFromCart: (item) => dispatch(deletePositionFromCart(item)),
  addPosition: (item) => dispatch(addPosition(item)),
  removePosition: (item) => dispatch(removePosition(item)),
});

export default connect(null, mapDispatchToProps)(CartPosition);
