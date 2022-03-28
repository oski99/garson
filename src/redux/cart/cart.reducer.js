import CartActionTypes from "./cart.types";
import { addPositionToCart, removeServedPositions } from "./cart.utils";
import { deletePositionFromCart } from "./cart.utils";
import { removePosition } from "./cart.utils";
import { changeStatusToOrdered } from "./cart.utils";

const INITIAL_STATE = {
  cartPositions: [],
  cartPositionsOrdered: [],
  cartPositionsServed: [],
  isFetching: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_POSITION:
      return {
        ...state,
        cartPositions: addPositionToCart(state.cartPositions, action.payload),
      };
    case CartActionTypes.REMOVE_POSITION:
      return {
        ...state,
        cartPositions: removePosition(state.cartPositions, action.payload),
      };
    case CartActionTypes.DELETE_POSITION_FROM_CART:
      return {
        ...state,
        cartPositions: deletePositionFromCart(
          state.cartPositions,
          action.payload
        ),
      };
    case CartActionTypes.CHANGE_STATUS_TO_ORDERED:
      changeStatusToOrdered(state.cartPositionsOrdered, state.cartPositions);
      return {
        ...state,
        cartPositions: [],
      };
    case CartActionTypes.FETCH_POSITIONS_ORDERED_START:
      return {
        ...state,
        isFetching: true,
      };
    case CartActionTypes.FETCH_POSITIONS_ORDERED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cartPositionsOrdered: action.payload,
      };
    case CartActionTypes.FETCH_POSITIONS_ORDERED_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case CartActionTypes.FETCH_POSITIONS_SERVED_START:
      return {
        ...state,
        isFetching: true,
      };
    case CartActionTypes.FETCH_POSITIONS_SERVED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cartPositionsServed: action.payload,
      };
    case CartActionTypes.FETCH_POSITIONS_SERVED_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case CartActionTypes.REMOVE_SERVED_POSITIONS:
      removeServedPositions(state.cartPositionsServed);
      return state;

    default:
      return state;
  }
};

export default cartReducer;
