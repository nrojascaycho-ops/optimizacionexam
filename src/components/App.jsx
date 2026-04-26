import { useState } from "react";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";

export default function App() {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      nombre: "María",
      apellido: "Gonzales",
      producto: "Televisor",
      cantidad: 2,
      estado: "pendiente",
      pago: "efectivo",
    },
    {
      id: 2,
      nombre: "Nikoll",
      apellido: "Rojas",
      producto: "Celular",
      cantidad: 5,
      estado: "cancelado",
      pago: "qr",
    },
  ]);

  const agregar = (nuevo) => {
    setPedidos([...pedidos, { ...nuevo, id: Date.now() }]);
  };

  const eliminar = (id) => {
    setPedidos(pedidos.filter((p) => p.id !== id));
  };

  const editar = (id, datos) => {
    setPedidos(
      pedidos.map((p) => (p.id === id ? { ...p, ...datos } : p))
    );
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
        <PedidoForm onAdd={agregar} />

        <h3>Pedidos Recientes</h3>

        <PedidoList
          pedidos={pedidos}
          onDelete={eliminar}
          onUpdate={editar}
        />
      </div>
    </>
  );
}