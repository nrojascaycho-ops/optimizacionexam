// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbgB1n8XXRND-E2oJTE5jyT6tgE_DYUz8",
  authDomain: "pedidos-app-3e8f0.firebaseapp.com",
  projectId: "pedidos-app-3e8f0",
  storageBucket: "pedidos-app-3e8f0.firebasestorage.app",
  messagingSenderId: "16995408994",
  appId: "1:16995408994:web:68e84a3acde7ac8b44053b"
};

// 🔥 INICIALIZAR
const app = initializeApp(firebaseConfig);

// 🔥 CONECTAR FIRESTORE (LO QUE TE FALTABA)
export const db = getFirestore(app);