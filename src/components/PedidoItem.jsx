export default function PedidoItem({ pedido, onDelete, onEdit }) {

  return (
    <div className="pedido">

      <div className="info-row">

        <strong>{pedido.nombre} {pedido.apellido}</strong>

        <span className="producto">
          {pedido.producto} (x{pedido.cantidad})
        </span>

        <span className={`estado ${pedido.estado}`}>
          {pedido.estado}
        </span>

        <span className="pago">
          {pedido.pago}
        </span>

      </div>

      <div className="actions">
        <button className="edit" onClick={() => onEdit(pedido)}>
          ✏ Editar
        </button>

        <button className="delete" onClick={() => onDelete(pedido.id)}>
          🗑
        </button>
      </div>

    </div>
  );
}