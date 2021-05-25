import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDL7asy5IhJqepRms6gqY8lbQkQLQlOWjI",
  authDomain: "creditwizard-ca622.firebaseapp.com",
  projectId: "creditwizard-ca622",
  storageBucket: "creditwizard-ca622.appspot.com",
  messagingSenderId: "333483944264",
  appId: "1:333483944264:web:f17f3f32461faacaa0ab7d",
};

const fire = firebase.initializeApp(firebaseConfig);

// export const auth = firebaseConfig.auth();
export default firebase;
