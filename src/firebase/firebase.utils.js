import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

var provider = new firebase.auth.GoogleAuthProvider();

export async function signInWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const loggedInUser = result.user;
      const isNewUser = result.additionalUserInfo.isNewUser;

      if (isNewUser) {
        //delete user if the user is new
        loggedInUser.delete().then(() => {
          firebase.auth().signOut();
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export default firebase;

// FIRESTORE

export const addCollectionAndDocuments = async (
  tableID,
  objectsToAdd,
  status
) => {
  const collectionRef = firestore.collection("tables");

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef
      .doc(`table${tableID}`)
      .collection(status)
      .doc(`${obj.id}`);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => doc.data());
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});
};

export const deleteDocument = async (tableID, mealID, status) => {
  const collectionRef = firestore.collection("tables");

  const batch = firestore.batch();

  const newDocRef = collectionRef
    .doc(`table${tableID}`)
    .collection(status)
    .doc(`${mealID}`);
  batch.delete(newDocRef);

  return await batch.commit();
};

export const addMenu = (ref, obj) => {
  const collectionRef = firestore.collection(ref);
  console.log(collectionRef);
  const batch = firestore.batch();
  obj.forEach((item) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, item);
  });
  batch.commit();
};
