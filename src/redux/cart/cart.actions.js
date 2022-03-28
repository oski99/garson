import CartActionTypes from "./cart.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const addPosition = (item) => ({
  type: CartActionTypes.ADD_POSITION,
  payload: item,
});

export const removePosition = (item) => ({
  type: CartActionTypes.REMOVE_POSITION,
  payload: item,
});

export const deletePositionFromCart = (item) => ({
  type: CartActionTypes.DELETE_POSITION_FROM_CART,
  payload: item,
});

export const changeStatusToOrdered = () => ({
  type: CartActionTypes.CHANGE_STATUS_TO_ORDERED,
});

export const removeServedPositions = () => ({
  type: CartActionTypes.REMOVE_SERVED_POSITIONS,
});

export const fetchPositionsOrderedStart = () => ({
  type: CartActionTypes.FETCH_POSITIONS_ORDERED_START,
});

export const fetchPositionsOrderedSuccess = (menuMap) => ({
  type: CartActionTypes.FETCH_POSITIONS_ORDERED_SUCCESS,
  payload: menuMap,
});

export const fetchPositionsOrderedFail = (errMess) => ({
  type: CartActionTypes.FETCH_POSITIONS_ORDERED_FAIL,
  payload: errMess,
});

export const fetchPositionsOrderedAsync = (tableID) => {
  return (dispatch) => {
    const collectionRef = firestore
      .collection(`tables`)
      .doc(`table${tableID}`)
      .collection("ordered");
    dispatch(fetchPositionsOrderedStart());
    collectionRef.onSnapshot(
      async (snapshot) => {
        const ordersMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchPositionsOrderedSuccess(Object.values(ordersMap)));
      },
      (err) => dispatch(fetchPositionsOrderedFail(err))
    );
  };
};

export const fetchPositionsServedStart = () => ({
  type: CartActionTypes.FETCH_POSITIONS_SERVED_START,
});

export const fetchPositionsServedSuccess = (menuMap) => ({
  type: CartActionTypes.FETCH_POSITIONS_SERVED_SUCCESS,
  payload: menuMap,
});

export const fetchPositionsServedFail = (errMess) => ({
  type: CartActionTypes.FETCH_POSITIONS_SERVED_FAIL,
  payload: errMess,
});

export const fetchPositionsServedAsync = (tableID) => {
  return (dispatch) => {
    const collectionRef = firestore
      .collection(`tables`)
      .doc(`table${tableID}`)
      .collection("served");
    dispatch(fetchPositionsServedStart());

    collectionRef.onSnapshot(
      async (snapshot) => {
        const ordersMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchPositionsServedSuccess(Object.values(ordersMap)));
      },
      (err) => dispatch(fetchPositionsServedFail(err))
    );
  };
};
