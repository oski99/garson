import {
  addCollectionAndDocuments,
  deleteDocument,
} from "../../firebase/firebase.utils";

export const changeStatusToServed = (orders, served, orderPosition) => {
  if (served[orderPosition.tableID][orderPosition.id]) {
    addCollectionAndDocuments(
      orderPosition.tableID,
      [
        {
          ...orderPosition,
          quantity:
            served[orderPosition.tableID][orderPosition.id].quantity + 1,
        },
      ],
      "served"
    );
  } else {
    addCollectionAndDocuments(
      orderPosition.tableID,
      [
        {
          ...orderPosition,
          quantity: 1,
        },
      ],
      "served"
    );
  }

  if (orderPosition.quantity === 1) {
    deleteDocument(orderPosition.tableID, orderPosition.id, "ordered");
  } else {
    let arr = Object.keys(orders[orderPosition.tableID]).map((key) => {
      return orders[orderPosition.tableID][key].id === orderPosition.id
        ? {
            ...orders[orderPosition.tableID][key],
            quantity: orders[orderPosition.tableID][key].quantity - 1,
          }
        : orders[orderPosition.tableID][key];
    });

    addCollectionAndDocuments(orderPosition.tableID, arr, "ordered");
  }
};

export const removePositions = (served, tableID, status) => {
  Object.keys(served[tableID]).forEach((key) => {
    deleteDocument(tableID, key, status);
  });
};

export const removePosition = (orders, orderPosition, status) => {
  if (orderPosition.quantity === 1) {
    deleteDocument(orderPosition.tableID, orderPosition.id, status);
  } else {
    let arr = Object.keys(orders[orderPosition.tableID]).map((key) => {
      return orders[orderPosition.tableID][key].id === orderPosition.id
        ? {
            ...orders[orderPosition.tableID][key],
            quantity: orders[orderPosition.tableID][key].quantity - 1,
          }
        : orders[orderPosition.tableID][key];
    });

    addCollectionAndDocuments(orderPosition.tableID, arr, status);
  }
};

export const addNewOrder = (orders, item) => {
  const { tableID, position } = item;
  let dateVar = new Date();
  delete position.description;
  delete position.imgUrl;

  const exisitingOrder = Object.keys(orders[tableID])
    .map((item) => orders[tableID][item])
    .find((order) => order.id === position.id);

  if (!exisitingOrder) {
    position.quantity = 1;
    position.date = dateVar;
    position.tableID = tableID;
    addCollectionAndDocuments(tableID, [position], "ordered");
  } else {
    exisitingOrder.quantity = exisitingOrder.quantity + 1;
    exisitingOrder.date = dateVar;
    addCollectionAndDocuments(tableID, [exisitingOrder], "ordered");
  }
};
