import OrdersActionTypes from "./orders.types";
import { TABLES_NUMBER } from "../../constants";
import { addNewOrder, changeStatusToServed } from "./orders.utils";
import { removePositions } from "./orders.utils";
import { removePosition } from "./orders.utils";

const INITIAL_STATE = {
  orders: {},
  served: {},
  isFetching: true,
  errorMessage: undefined,
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        orders: {},
        isFetching: true,
      };
    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      state.orders[action.payload["table"]] = action.payload["orders"];

      return {
        ...state,
      };
    case OrdersActionTypes.FETCH_SERVED_START:
      return {
        ...state,
        served: {},
        isFetching: true,
      };
    case OrdersActionTypes.FETCH_SERVED_SUCCESS:
      state.served[action.payload["table"]] = action.payload["orders"];
      Object.keys(state.served).length === TABLES_NUMBER
        ? (state.isFetching = false)
        : (state.isFetching = true);
      return {
        ...state,
      };
    case OrdersActionTypes.ADD_NEW_ORDER:
      addNewOrder(state.orders, action.payload);
      return state;
    case OrdersActionTypes.CHANGE_STATUS_TO_SERVED:
      changeStatusToServed(state.orders, state.served, action.payload);
      return state;
    case OrdersActionTypes.REMOVE_SERVED:
      removePositions(state.served, action.payload, "served");
      return state;
    case OrdersActionTypes.REMOVE_ORDERED:
      removePosition(state.orders, action.payload, "ordered");
      return state;
    case OrdersActionTypes.FETCH_ORDERS_FAIL:
    case OrdersActionTypes.FETCH_SERVED_FAIL:
    default:
      return state;
  }
};

export default ordersReducer;
