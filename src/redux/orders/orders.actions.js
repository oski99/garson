import OrdersActionTypes from "./orders.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { TABLES_NUMBER } from "../../constants";

export const fetchOrdersStart = () => ({
  type: OrdersActionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = (ordersMap, tableID) => ({
  type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
  payload: { orders: ordersMap, table: tableID },
});

export const fetchOrdersFail = (errMess) => ({
  type: OrdersActionTypes.FETCH_ORDERS_FAIL,
  payload: errMess,
});

export const fetchOrdersStartAsync = () => {
  return (dispatch) => {
    for (let tableID = 1; tableID <= TABLES_NUMBER; tableID++) {
      const collectionRef = firestore
        .collection(`tables`)
        .doc(`table${tableID}`)
        .collection("ordered");
      dispatch(fetchOrdersStart());
      collectionRef.onSnapshot(
        async (snapshot) => {
          const ordersMap = convertCollectionsSnapshotToMap(snapshot);
          dispatch(fetchOrdersSuccess(ordersMap, tableID));
        },
        (err) => dispatch(fetchOrdersFail(err))
      );
    }
  };
};

export const fetchServedStart = () => ({
  type: OrdersActionTypes.FETCH_SERVED_START,
});

export const fetchServedSuccess = (ordersMap, tableID) => ({
  type: OrdersActionTypes.FETCH_SERVED_SUCCESS,
  payload: { orders: ordersMap, table: tableID },
});

export const fetchServedFail = (errMess) => ({
  type: OrdersActionTypes.FETCH_SERVED_FAIL,
  payload: errMess,
});

export const fetchServedStartAsync = () => {
  return (dispatch) => {
    for (let tableID = 1; tableID <= TABLES_NUMBER; tableID++) {
      const collectionRef = firestore
        .collection(`tables`)
        .doc(`table${tableID}`)
        .collection("served");
      dispatch(fetchServedStart());
      collectionRef.onSnapshot(
        async (snapshot) => {
          const ordersMap = convertCollectionsSnapshotToMap(snapshot);
          dispatch(fetchServedSuccess(ordersMap, tableID));
        },
        (err) => dispatch(fetchServedFail(err))
      );
    }
  };
};

export const addNewOrder = (item) => ({
  type: OrdersActionTypes.ADD_NEW_ORDER,
  payload: item,
});

export const changeStatusToServed = (item) => ({
  type: OrdersActionTypes.CHANGE_STATUS_TO_SERVED,
  payload: item,
});

export const removeServed = (item) => ({
  type: OrdersActionTypes.REMOVE_SERVED,
  payload: item,
});

export const removeOrdered = (item) => ({
  type: OrdersActionTypes.REMOVE_ORDERED,
  payload: item,
});
