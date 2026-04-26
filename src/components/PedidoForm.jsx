import { useState } from "react";

export default function PedidoForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !producto) return;

    onAdd({ nombre, producto, estado });

    setNombre("");
    setProducto("");
    setEstado("pendiente");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        placeholder="Producto"
        value={producto}
        onChange={e => setProducto(e.target.value)}
      />

      <select value={estado} onChange={e => setEstado(e.target.value)}>
        <option value="pendiente">Pendiente</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </select>

      <button className="btn-save">Guardar</button>
    </form>
  );
}