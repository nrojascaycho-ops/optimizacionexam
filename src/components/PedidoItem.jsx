export default function PedidoItem({ pedido, onDelete, onEdit }) {

  return (
    <div className="pedido">

      <div className="left">
        <button className="btn-ver">⬇</button>

        <div className="info">
          <strong>
            {pedido.nombre} {pedido.apellido}
          </strong>
          <div>{pedido.producto}</div>
        </div>

        <span className={`estado ${pedido.estado}`}>
          {pedido.estado}
        </span>

        <span className="pago">
          {pedido.pago}
        </span>
      </div>

      <div className="actions">
        <button className="edit">✏ Editar</button>

        <button
          className="delete"
          onClick={() => onDelete(pedido.id)}
        >
          🗑
        </button>
      </div>

    </div>
  );
}