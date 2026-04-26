import { useState } from "react";

export default function PedidoItem({ pedido, onDelete, onEdit }) {
  const [editando, setEditando] = useState(false);

  const [nombre, setNombre] = useState(pedido.nombre);
  const [apellido, setApellido] = useState(pedido.apellido);
  const [producto, setProducto] = useState(pedido.producto);
  const [cantidad, setCantidad] = useState(pedido.cantidad);
  const [estado, setEstado] = useState(pedido.estado);
  const [pago, setPago] = useState(pedido.pago);

  const guardar = () => {
    onEdit(pedido.id, { nombre, apellido, producto, cantidad, estado, pago });
    setEditando(false);
  };

  return (
    <div className="pedido">

      <div className="left">
        <button className="btn-ver">⬇</button>

        <div className="info">

          {editando ? (
            <>
              <div className="edit-row">
                <input value={nombre} onChange={e => setNombre(e.target.value)} />
                <input value={apellido} onChange={e => setApellido(e.target.value)} />
              </div>

              <div className="edit-row">
                <input value={producto} onChange={e => setProducto(e.target.value)} />
                <input
                  type="number"
                  value={cantidad}
                  onChange={e => setCantidad(e.target.value)}
                />
              </div>

              <div className="edit-row">
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
            </>
          ) : (
            <>
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
            </>
          )}

        </div>
      </div>

      <div className="actions">
        {editando ? (
          <>
            <button className="edit" onClick={guardar}>
              Guardar
            </button>

            <button className="delete" onClick={() => setEditando(false)}>
              ✖
            </button>
          </>
        ) : (
          <>
            <button className="edit" onClick={() => setEditando(true)}>
              ✏ Editar
            </button>

            <button className="delete" onClick={() => onDelete(pedido.id)}>
              🗑
            </button>
          </>
        )}
      </div>

    </div>
  );
}