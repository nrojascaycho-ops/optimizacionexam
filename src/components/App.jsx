import { useState, useEffect } from "react";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export default function App() {

  const [pedidos, setPedidos] = useState([]);
  const pedidosRef = collection(db, "pedidos");

  // 🔥 OBTENER DATOS
  const getPedidos = async () => {
    const data = await getDocs(pedidosRef);
    setPedidos(
      data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
    );
  };

  useEffect(() => {
    getPedidos();
  }, []);

  // ➕ AGREGAR
  const agregar = async (pedido) => {
    await addDoc(pedidosRef, pedido);
    getPedidos();
  };

  // ❌ ELIMINAR
  const eliminar = async (id) => {
    const pedidoDoc = doc(db, "pedidos", id);
    await deleteDoc(pedidoDoc);
    getPedidos();
  };

  // ✏ EDITAR
  const editar = async (id, datos) => {
    const pedidoDoc = doc(db, "pedidos", id);
    await updateDoc(pedidoDoc, datos);
    getPedidos();
  };

  return (
    <>
      {/* 🔥 HEADER ORIGINAL */}
      <div className="header">

        <div className="logo">
          <span>☁️</span>
          <strong>Sem4-Pc1</strong>
        </div>

        <div className="menu">
          <span className="active">Gestión de Pedidos</span>
          <span>Clientes</span>
          <span>Productos</span>
        </div>

        <div className="user">
          <span>Rojas Caycho</span>
        </div>

      </div>

      {/* CONTENIDO */}
      <div className="container">

        <PedidoForm onAdd={agregar} />

        <div className="title">Pedidos Recientes</div>

        <PedidoList
          pedidos={pedidos}
          onDelete={eliminar}
          onEdit={editar}
        />

      </div>
    </>
  );
}