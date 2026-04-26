import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvLLtArb1CylnDaCABB21vTBx8wja2syA",
  authDomain: "gestion-pedidos-fa99a.firebaseapp.com",
  projectId: "gestion-pedidos-fa99a",
  storageBucket: "gestion-pedidos-fa99a.firebasestorage.app",
  messagingSenderId: "44189358527",
  appId: "1:44189358527:web:62654119b8425f06a1a90a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);