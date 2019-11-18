import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";
// // import something here

// // "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
//   // something to do
//   // e.g. this.$axios("fetch/cool/url")
// }

var firebaseConfig = {
  apiKey: "AIzaSyB1K1m53YR6nHwG6qJwVDmCep5dfNGYTjI",
  authDomain: "awesome-todo-ee98a.firebaseapp.com",
  databaseURL: "https://awesome-todo-ee98a.firebaseio.com",
  projectId: "awesome-todo-ee98a",
  storageBucket: "awesome-todo-ee98a.appspot.com",
  messagingSenderId: "498163602990",
  appId: "1:498163602990:web:8b9999ceacc6cff33b71bf",
  measurementId: "G-Z38F9W4NQS"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database()
firebase.analytics(); // breaks the app!

export { firebaseAuth, firebaseDb };
