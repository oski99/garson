// import MENU_DATA from "./menu.data";

import MenuActionTypes from "./menu.types";

const INITIAL_STATE = {
  menu: null,
  isFetching: false,
  errorMessage: undefined,
};
const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MenuActionTypes.FETCH_MENU_START:
      return {
        ...state,
        isFetching: true,
      };
    case MenuActionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        isFetching: false,
        menu: action.payload,
      };
    case MenuActionTypes.FETCH_MENU_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case MenuActionTypes.UPDATE_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    default:
      return state;
  }
};

export default menuReducer;
