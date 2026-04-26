import { useState } from "react";

export default function PedidoForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [producto, setProducto] = useState("");
  const [estado, setEstado] = useState("");
  const [pago, setPago] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !producto || !estado || !pago) {
      alert("Completa todos los campos");
      return;
    }

    onAdd({ nombre, apellido, producto, estado, pago });

    setNombre("");
    setApellido("");
    setProducto("");
    setEstado("");
    setPago("");
  };

  return (
    <div className="form-card">
      <h3>Rellene el formulario</h3>

      <form onSubmit={handleSubmit} className="form-inline">
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
        <input placeholder="Producto" value={producto} onChange={e => setProducto(e.target.value)} />

        <select value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <select value={pago} onChange={e => setPago(e.target.value)}>
          <option value="">Pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="qr">QR</option>
        </select>

        <button className="btn-save">Guardar</button>
      </form>
    </div>
  );
}