// import React from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBPZn7tIEFFRZurDjTpitti3SgDpUQ_AFU",
  authDomain: "login-393912.firebaseapp.com",
  projectId: "login-393912",
  storageBucket: "login-393912.appspot.com",
  messagingSenderId: "261238862825",
  appId: "1:261238862825:web:34a6536a42a31bde135178",
  measurementId: "G-MVKQWNLX8V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()


