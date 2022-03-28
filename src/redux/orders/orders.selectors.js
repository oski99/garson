import { createSelector } from "reselect";

const selectOrders = (state) => state.orders;

export const selectIsFetching = createSelector(
  [selectOrders],
  (orders) => orders.isFetching
);

export const selectOrdersChronological = createSelector(
  [selectOrders],
  (orders) => {
    let arr = [];
    Object.keys(orders.orders)
      .map((key) => orders.orders[key])
      .forEach((obj) => arr.push(obj));
    arr = arr.map((obj) => Object.keys(obj).map((key) => obj[key])).flat();
    arr.sort(function (a, b) {
      return new Date(a.date.toDate()) - new Date(b.date.toDate());
    });
    return arr;
  }
);
