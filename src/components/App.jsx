import { useState } from "react";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";

export default function App() {
  const [pedidos, setPedidos] = useState([
    { id: 1, nombre: "Juan Pérez", producto: "Laptop Pro", estado: "pendiente" },
    { id: 2, nombre: "María García", producto: "Monitor 4K", estado: "entregado" }
  ]);

  const agregar = (pedido) => {
    setPedidos([...pedidos, { ...pedido, id: Date.now() }]);
  };

  const eliminar = (id) => {
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  const editar = (id, datos) => {
    setPedidos(
      pedidos.map(p => p.id === id ? { ...p, ...datos } : p)
    );
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <span>☁️</span>
          <strong>Taller-Sem4</strong>
        </div>

        <div className="menu">
          <span className="active">Gestión de Pedidos</span>
          <span>Clientes</span>
          <span>Productos</span>
        </div>

        <button className="btn-new">Pedidos</button>
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