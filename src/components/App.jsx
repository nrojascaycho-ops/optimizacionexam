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
  const [editando, setEditando] = useState(null);

  const pedidosRef = collection(db, "pedidos");

  const getPedidos = async () => {
    const data = await getDocs(pedidosRef);
    setPedidos(
      data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    );
  };

  useEffect(() => {
    getPedidos();
  }, []);

  const agregar = async (pedido) => {
    await addDoc(pedidosRef, pedido);
    getPedidos();
  };

  const eliminar = async (id) => {
    await deleteDoc(doc(db, "pedidos", id));
    getPedidos();
  };

  const editar = async (id, datos) => {
    await updateDoc(doc(db, "pedidos", id), datos);
    setEditando(null);
    getPedidos();
  };

  return (
    <>
      <div className="header">
        <div className="logo">☁️ <strong>Sem4-Pc1</strong></div>
        <div className="menu">
          <span className="active">Gestión de Pedidos</span>
          <span>Clientes</span>
          <span>Productos</span>
        </div>
        <div className="user">Rojas Caycho</div>
      </div>

      <div className="container">

        <PedidoForm
          onAdd={agregar}
          onUpdate={editar}
          editando={editando}
          setEditando={setEditando}
        />

        <div className="title">Pedidos Recientes</div>

        <PedidoList
          pedidos={pedidos}
          onDelete={eliminar}
          onEdit={setEditando}
        />

      </div>
    </>
  );
}