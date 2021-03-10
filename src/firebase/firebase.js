import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyD_A7xKqqdSfPrdcE83YyglmOQseIC57o4",
  authDomain: "chat-app-266c1.firebaseapp.com",
  databaseURL: "https://chat-app-266c1.firebaseio.com",
  projectId: "chat-app-266c1",
  storageBucket: "chat-app-266c1.appspot.com",
  messagingSenderId: "419457372183",
  appId: "1:419457372183:web:ca6c772b5cdf0951ce8c52",
  measurementId: "G-KEYS2B1BYN",
});
const db = firebase.firestore();
export default db;
