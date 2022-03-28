import React from "react";
import { connect } from "react-redux";
import { selectCartPositions } from "../../../redux/cart/cart.selectors";
import { changeStatusToOrdered } from "../../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import CustomButton from "../../custom-button/custom-button.component";
import CartPosition from "../cart-position/cart-position.component";
import "./cart-list.styles.scss";

const CartList = ({ cartPositions, changeStatusToOrdered }) => {
  return (
    <div className="cart-list">
      {cartPositions.length ? (
        cartPositions.map((position) => (
          <CartPosition
            editable={true}
            key={position.id}
            cartPosition={position}
          />
        ))
      ) : (
        <h1>nothing to order</h1>
      )}
      {cartPositions.length ? (
        <CustomButton
          onClick={() => {
            changeStatusToOrdered();
          }}
        >
          Make Order
        </CustomButton>
      ) : null}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  cartPositions: selectCartPositions,
});
const mapDispatchToProps = (dispatch) => ({
  changeStatusToOrdered: (item) => dispatch(changeStatusToOrdered(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
