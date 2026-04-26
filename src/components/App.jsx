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

  // 🔥 OBTENER DATOS (ARREGLADO)
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await getDocs(pedidosRef);

        const lista = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("DATOS FIREBASE:", lista);

        setPedidos(lista);
      } catch (error) {
        console.error("ERROR AL CARGAR:", error);
      }
    };

    cargarPedidos();
  }, []);

  // ➕ AGREGAR
  const agregar = async (pedido) => {
    try {
      await addDoc(pedidosRef, pedido);

      // 🔥 recargar lista
      const data = await getDocs(pedidosRef);
      setPedidos(
        data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    } catch (error) {
      console.error("ERROR AL AGREGAR:", error);
    }
  };

  // ❌ ELIMINAR
  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "pedidos", id));

      setPedidos(pedidos.filter(p => p.id !== id));
    } catch (error) {
      console.error("ERROR AL ELIMINAR:", error);
    }
  };

  // ✏ EDITAR
  const editar = async (id, datos) => {
    try {
      await updateDoc(doc(db, "pedidos", id), datos);

      setPedidos(
        pedidos.map(p =>
          p.id === id ? { ...p, ...datos } : p
        )
      );
    } catch (error) {
      console.error("ERROR AL EDITAR:", error);
    }
  };

  return (
    <>
      {/* HEADER ORIGINAL */}
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