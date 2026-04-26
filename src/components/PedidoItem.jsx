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
      cantidad: Number(form.cantidad) // 🔥 IMPORTANTE
    });
    setEditando(false);
  };

  if (editando) {
    return (
      <div className="pedido-card editando">

        <div className="form-grid">

          <input name="nombre" value={form.nombre} onChange={handleChange} />
          <input name="apellido" value={form.apellido} onChange={handleChange} />
          <input name="producto" value={form.producto} onChange={handleChange} />
          
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
          />

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

  return (
    <div className="pedido-card">

      <div className="pedido-left">

        <div className="avatar">↓</div>

        <div>
          <strong>{pedido.nombre} {pedido.apellido}</strong>
          <div className="producto">
            {pedido.producto} (x{pedido.cantidad})
          </div>

          <div className="badges">
            <span className={`estado ${pedido.estado}`}>
              {pedido.estado}
            </span>

            <span className="pago">
              {pedido.pago}
            </span>
          </div>
        </div>

      </div>

      <div className="actions">
        <button className="edit" onClick={() => setEditando(true)}>
          Editar
        </button>

        <button className="delete" onClick={() => onDelete(pedido.id)}>
          🗑
        </button>
      </div>

    </div>
  );
}