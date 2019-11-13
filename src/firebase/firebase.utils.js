import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAPkEwQVK3kuhYI90HI8lebxkF2CsO_eGU",
    authDomain: "crown-db-c73f1.firebaseapp.com",
    databaseURL: "https://crown-db-c73f1.firebaseio.com",
    projectId: "crown-db-c73f1",
    storageBucket: "crown-db-c73f1.appspot.com",
    messagingSenderId: "292510064814",
    appId: "1:292510064814:web:30e3d65f779b2cf79e0d3f",
    measurementId: "G-XG48B9498H"
  }
  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
