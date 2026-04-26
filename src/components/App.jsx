import { useState, useEffect } from "react";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";

export default function App() {

  const [pedidos, setPedidos] = useState([]);
  const [cargado, setCargado] = useState(false);

  // 🔥 CARGAR DESDE localStorage
  useEffect(() => {
    const data = localStorage.getItem("pedidos");
    if (data) {
      setPedidos(JSON.parse(data));
    }
    setCargado(true);
  }, []);

  // 🔥 GUARDAR
  useEffect(() => {
    if (cargado) {
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }
  }, [pedidos, cargado]);

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
          <strong>Gestión</strong>
        </div>

        <button
          className="btn-new"
          onClick={() => {
            localStorage.removeItem("pedidos");
            setPedidos([]);
          }}
        >
          Reset
        </button>
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