import { useState } from "react";

export default function PedidoItem({ pedido, onDelete, onEdit }) {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(pedido.nombre);
  const [apellido, setApellido] = useState(pedido.apellido);
  const [producto, setProducto] = useState(pedido.producto);
  const [estado, setEstado] = useState(pedido.estado);
  const [pago, setPago] = useState(pedido.pago);

  const guardar = () => {
    onEdit(pedido.id, { nombre, apellido, producto, estado, pago });
    setEditando(false);
  };

  return (
    <div className="pedido">

      {editando ? (
        <>
          <div className="left">
            <input value={nombre} onChange={e => setNombre(e.target.value)} />
            <input value={apellido} onChange={e => setApellido(e.target.value)} />
            <input value={producto} onChange={e => setProducto(e.target.value)} />

            <select value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <select value={pago} onChange={e => setPago(e.target.value)}>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="qr">QR</option>
            </select>
          </div>

          <div className="actions">
            <button className="edit" onClick={guardar}>✔</button>
            <button className="delete" onClick={() => setEditando(false)}>✖</button>
          </div>
        </>
      ) : (
        <>
          <div className="left">
            <button className="btn-ver">⬇</button>

            <div>
              <strong>{pedido.nombre} {pedido.apellido}</strong>
              <div>{pedido.producto}</div>
            </div>

            <span className={`estado ${pedido.estado}`}>
              {pedido.estado}
            </span>

            <span className="pago">{pedido.pago}</span>
          </div>

          <div className="actions">
            <button className="edit" onClick={() => setEditando(true)}>✏</button>
            <button className="delete" onClick={() => onDelete(pedido.id)}>🗑</button>
          </div>
        </>
      )}
    </div>
  );
}