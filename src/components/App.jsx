import { useState, useEffect } from "react";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";

export default function App() {

  // 🔥 CARGAR DESDE LOCALSTORAGE
  const [pedidos, setPedidos] = useState(() => {
    const data = localStorage.getItem("pedidos");
    return data ? JSON.parse(data) : [];
  });

  // 🔥 GUARDAR AUTOMÁTICAMENTE
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  // ➕ AGREGAR
  const agregar = (pedido) => {
    setPedidos([
      ...pedidos,
      { id: Date.now(), ...pedido }
    ]);
  };

  // ❌ ELIMINAR
  const eliminar = (id) => {
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  // ✏ EDITAR
  const editar = (id, datos) => {
    setPedidos(
      pedidos.map(p =>
        p.id === id ? { ...p, ...datos } : p
      )
    );
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <span>☁️</span>
          <strong>Gestión</strong>
        </div>

        <div className="menu">
          <span className="active">Pedidos</span>
        </div>
      </div>

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