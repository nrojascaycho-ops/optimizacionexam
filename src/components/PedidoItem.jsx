import { useState } from "react";

export default function PedidoItem({ pedido, index, onDelete, onEdit }) {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(pedido.nombre);
  const [producto, setProducto] = useState(pedido.producto);
  const [estado, setEstado] = useState(pedido.estado);

  const guardar = () => {
    onEdit(pedido.id, { nombre, producto, estado });
    setEditando(false);
  };

  return (
    <div className="pedido">
      <div className="left">
        <button className="btn-ver">⬇</button>

        {editando ? (
          <>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />

            <input
              value={producto}
              onChange={e => setProducto(e.target.value)}
            />

            <select
              value={estado}
              onChange={e => setEstado(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </>
        ) : (
          <>
            <div className="info">
              <strong>
                #{String(index + 1).padStart(4, "0")}
              </strong>
              {pedido.nombre}
            </div>

            <div>{pedido.producto}</div>

            <span className={`estado ${pedido.estado}`}>
              {pedido.estado}
            </span>
          </>
        )}
      </div>

      <div className="actions">

        {editando ? (
          <button className="btn btn-circle" onClick={guardar}>
            ✔
          </button>
        ) : (
          <button className="btn" onClick={() => setEditando(true)}>
            ✏ Editar
          </button>
        )}

        <button
          className="btn btn-circle btn-danger"
          onClick={() => onDelete(pedido.id)}
        >
          🗑
        </button>


      </div>
    </div>
  );
}