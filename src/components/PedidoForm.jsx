import { useState, useEffect } from "react";

export default function PedidoForm({ onAdd, onUpdate, editando, setEditando }) {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [estado, setEstado] = useState("");
  const [pago, setPago] = useState("");

  useEffect(() => {
    if (editando) {
      setNombre(editando.nombre);
      setApellido(editando.apellido);
      setProducto(editando.producto);
      setCantidad(editando.cantidad);
      setEstado(editando.estado);
      setPago(editando.pago);
    }
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const pedido = {
      nombre,
      apellido,
      producto,
      cantidad,
      estado,
      pago
    };

    if (editando) {
      onUpdate(editando.id, pedido);
    } else {
      onAdd(pedido);
    }

    setEditando(null);

    setNombre("");
    setApellido("");
    setProducto("");
    setCantidad("");
    setEstado("");
    setPago("");
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>

      <h2>{editando ? "Editar Pedido" : "Ingrese los Datos"}</h2>

      <div className="form-grid">

        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
        <input placeholder="Producto" value={producto} onChange={e => setProducto(e.target.value)} />

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
        />

        <select value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="">Seleccione estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <select value={pago} onChange={e => setPago(e.target.value)}>
          <option value="">Seleccione pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="qr">QR</option>
        </select>

        <button type="submit">
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </div>
    </form>
  );
}