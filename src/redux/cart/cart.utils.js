import {
  addCollectionAndDocuments,
  deleteDocument,
} from "../../firebase/firebase.utils";

export const addPositionToCart = (cartPositions, cartPositionToAdd) => {
  const exisitingCartPosition = cartPositions.find(
    (cartPosition) => cartPosition.id === cartPositionToAdd.id
  );

  if (exisitingCartPosition) {
    return cartPositions.map((cartPosition) =>
      cartPosition.id === cartPositionToAdd.id
        ? { ...cartPosition, quantity: cartPosition.quantity + 1 }
        : { ...cartPosition }
    );
  }

  return [...cartPositions, { ...cartPositionToAdd, quantity: 1 }];
};

export const removePosition = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const deletePositionFromCart = (cartPositions, cartPositionToDelete) => {
  const exisitingCartPosition = cartPositions.find(
    (cartPosition) => cartPosition.id === cartPositionToDelete.id
  );

  if (exisitingCartPosition) {
    return cartPositions.filter(
      (cartPosition) => cartPosition.id !== cartPositionToDelete.id
    );
  }

  return cartPositions;
};

export const changeStatusToOrdered = (cartPositionsOrdered, cartPositions) => {
  let dateVar = new Date();

  if (cartPositionsOrdered.length === 0) {
    cartPositions.forEach((key) => {
      key.date = dateVar;
    });

    addCollectionAndDocuments(
      cartPositions[0].tableID,
      cartPositions,
      "ordered"
    );
  }

  let outputArr = [...cartPositionsOrdered];
  cartPositions.forEach((position) => {
    const exisitingCartPosition = cartPositionsOrdered.find(
      (cartPosition) => cartPosition.id === position.id
    );

    if (exisitingCartPosition) {
      outputArr = outputArr.map((cartPosition) =>
        cartPosition.id === position.id
          ? {
              ...cartPosition,
              quantity: cartPosition.quantity + position.quantity,
            }
          : { ...cartPosition }
      );
    } else {
      outputArr.push({ ...position, date: dateVar });
    }
  });

  addCollectionAndDocuments(outputArr[0].tableID, outputArr, "ordered");
};

export const removeServedPositions = (cartPositionsServed) => {
  cartPositionsServed.forEach((key) => {
    deleteDocument(key.tableID, key.id, "served");
  });
};
