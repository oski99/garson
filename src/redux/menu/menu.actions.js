import MenuActionTypes from "./menu.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const updateMenu = (menuMap) => ({
  type: MenuActionTypes.UPDATE_MENU,
  payload: menuMap,
});

export const togglePopUp = () => ({
  type: MenuActionTypes.TOGGLE_POPUP,
});

export const fetchMenuStart = () => ({
  type: MenuActionTypes.FETCH_MENU_START,
});

export const fetchMenuSuccess = (menuMap) => ({
  type: MenuActionTypes.FETCH_MENU_SUCCESS,
  payload: menuMap,
});

export const fetchMenuFail = (errMess) => ({
  type: MenuActionTypes.FETCH_MENU_FAIL,
  payload: errMess,
});

export const fetchMenuStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("menu");
    dispatch(fetchMenuStart());
    collectionRef.onSnapshot(
      async (snapshot) => {
        const menuMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchMenuSuccess(menuMap));
      },
      (err) => dispatch(fetchMenuFail(err))
    );
    // .catch((err) => dispatch(fetchMenuFail(err)));
  };
};
