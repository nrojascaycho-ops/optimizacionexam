import { useState } from "react";

export default function PedidoItem({ pedido, onDelete, onUpdate }) {

  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({ ...pedido });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = () => {
    onUpdate(pedido.id, {
      ...form,
      cantidad: Number(form.cantidad)
    });
    setEditando(false);
  };

  // 🔥 MODO EDITAR (MISMO FORMULARIO)
  if (editando) {
    return (
      <div className="pedido">

        <div className="form-grid">
          <input name="nombre" value={form.nombre} onChange={handleChange} />
          <input name="apellido" value={form.apellido} onChange={handleChange} />
          <input name="producto" value={form.producto} onChange={handleChange} />
          <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} />

          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <select name="pago" value={form.pago} onChange={handleChange}>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="qr">QR</option>
          </select>

          <button className="btn-main" onClick={guardar}>
            Guardar
          </button>

          <button className="delete" onClick={() => setEditando(false)}>
            ✖
          </button>
        </div>

      </div>
    );
  }

  // 🔥 MODO NORMAL (MISMO ESTILO PERO SOLO TEXTO)
  return (
    <div className="pedido simple">

      <div className="texto">
        {pedido.nombre} {pedido.apellido} — {pedido.producto} (x{pedido.cantidad}) — {pedido.estado} — {pedido.pago}
      </div>

      <div className="actions">
        <button className="edit" onClick={() => setEditando(true)}>
          Editar
        </button>

        <button className="delete" onClick={() => onDelete(pedido.id)}>
          X
        </button>
      </div>

    </div>
  );
}