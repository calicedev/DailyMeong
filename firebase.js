import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_SaRAKcX_QnA9kCOBG52XZlQHWlvHEvo",
  authDomain: "run-mapper-5da17.firebaseapp.com",
  projectId: "run-mapper-5da17",
  storageBucket: "run-mapper-5da17.appspot.com",
  messagingSenderId: "1029445160833",
  appId: "1:1029445160833:web:53d8f4d04bc0bbe25da280",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
