import React from "react";
import { connect } from "react-redux";
import { selectCartPositionsOrdered } from "../../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import CartPosition from "../cart-position/cart-position.component";
import "./cart-list-ordered.styles.scss";

const CartListOrdered = ({ cartPositionsOrdered }) => {
  return (
    <div className="cart-list">
      {cartPositionsOrdered.length ? (
        <>
          <h1>...getting prepared...</h1>
          {cartPositionsOrdered.map((position) => (
            <CartPosition key={position.id} cartPosition={position} />
          ))}
        </>
      ) : (
        <h1>no orders yet</h1>
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  cartPositionsOrdered: selectCartPositionsOrdered,
});

export default connect(mapStateToProps)(CartListOrdered);
