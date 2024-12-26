import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjJ3Ph6GUOFefK1_x9LT6bGEIRbJnNVeg",
  authDomain: "fir-crud-7ed98.firebaseapp.com",
  projectId: "fir-crud-7ed98",
  storageBucket: "fir-crud-7ed98.firebasestorage.app",
  messagingSenderId: "870179531143",
  appId: "1:870179531143:web:ad61d7830e5139a4060b22"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
