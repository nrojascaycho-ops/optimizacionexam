import { useState, useEffect } from "react";

export default function PedidoForm({ onAdd, onUpdate, editando, setEditando }) {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    producto: "",
    cantidad: "",
    estado: "",
    pago: ""
  });

  useEffect(() => {
    if (editando) {
      setForm(editando);
    }
  }, [editando]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editando) {
      onUpdate(editando.id, form);
    } else {
      onAdd(form);
    }

    setEditando(null);

    setForm({
      nombre: "",
      apellido: "",
      producto: "",
      cantidad: "",
      estado: "",
      pago: ""
    });
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>

      <h2>{editando ? "Editar Pedido" : "Ingrese los Datos"}</h2>

      <div className="form-grid">

        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="producto" placeholder="Producto" value={form.producto} onChange={handleChange} />
        <input type="number" name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="">Seleccione estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <select name="pago" value={form.pago} onChange={handleChange}>
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