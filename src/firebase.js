import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "pedidos-app-3e8f0.firebaseapp.com",
  projectId: "pedidos-app-3e8f0",
  storageBucket: "pedidos-app-3e8f0.appspot.com",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);