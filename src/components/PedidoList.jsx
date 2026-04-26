import PedidoItem from "./PedidoItem";

export default function PedidoList({ pedidos, onDelete, onEdit }) {
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