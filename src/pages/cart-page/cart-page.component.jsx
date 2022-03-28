import React from "react";
import "./cart-page.styles.scss";
import CartListOrdered from "../../components/customer-components/cart-list-ordered/cart-list-ordered.component";
import CartListServed from "../../components/customer-components/cart-list-served/cart-list-served.component";
import CartList from "../../components/customer-components/cart-list/cart-list.component";

const CartPage = () => {
  return (
    <div className="cart-page">
      <div className="cart-header"></div>

      <CartList></CartList>

      <div className="cart-header"></div>

      <CartListOrdered></CartListOrdered>

      <div className="cart-header"></div>

      <CartListServed></CartListServed>
    </div>
  );
};

export default CartPage;
