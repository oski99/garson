import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartPositions = createSelector(
  [selectCart],
  (cart) => cart.cartPositions
);

export const selectCartPositionsOrdered = createSelector(
  [selectCart],
  (cart) => cart.cartPositionsOrdered
);

export const selectCartPositionsServed = createSelector(
  [selectCart],
  (cart) => cart.cartPositionsServed
);

export const selectCartPositionsPriceSumUp = createSelector(
  [selectCartPositionsServed],
  (cartPositionsServed) =>
    cartPositionsServed.reduce(
      (accumalatedQuantity, cartPositionsServed) =>
        accumalatedQuantity +
        cartPositionsServed.quantity * cartPositionsServed.price,
      0
    )
);
