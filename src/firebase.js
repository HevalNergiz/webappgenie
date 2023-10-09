import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDMsJS7kog9GeoOpU7x-jjMzgSRKYlA12A",
  authDomain: "webappgenie1.firebaseapp.com",
  projectId: "webappgenie1",
  storageBucket: "webappgenie1.appspot.com",
  messagingSenderId: "724450283143",
  appId: "1:724450283143:web:93554740835d5c9960f222",
  measurementId: "G-6H03FZGWK3",
});

export const auth = app.auth();
export default app;
