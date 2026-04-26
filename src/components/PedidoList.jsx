import PedidoItem from "./PedidoItem";

export default function PedidoList({ pedidos, onDelete, onEdit }) {
  if (!pedidos.length) {
    return <p>No hay pedidos aún</p>;
  }

  return (
    <div>
      {pedidos.map(p => (
        <PedidoItem
          key={p.id}
          pedido={p}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}