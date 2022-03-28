import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { removeServedPositions } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const StripeButton = ({ price, removeServedPositions }) => {
  const priceForStripe = price * 100;

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
    removeServedPositions();
  };

  return (
    <StripeCheckout
      label="Pay now"
      amount={priceForStripe}
      currency="pln"
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      description={`Your total is ${price}pln`}
      token={onToken}
    ></StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeServedPositions: () => dispatch(removeServedPositions()),
});

export default connect(null, mapDispatchToProps)(StripeButton);
