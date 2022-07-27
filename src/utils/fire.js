// import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAXHeGCjg1vIqzqq3Ng1Q2ZJb0SN7BGWY",
  authDomain: "fir-maps-ff16f.firebaseapp.com",
  databaseURL: "https://fir-maps-ff16f-default-rtdb.firebaseio.com",
  projectId: "fir-maps-ff16f",
  storageBucket: "fir-maps-ff16f.appspot.com",
  messagingSenderId: "840893972917",
  appId: "1:840893972917:web:dbb93fab1efed30a15d9fc",
  measurementId: "G-97X82Q2MB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
