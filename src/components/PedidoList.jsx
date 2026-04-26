import PedidoItem from "./PedidoItem";

export default function PedidoList({ pedidos, onDelete, onEdit }) {
  return (
    <>
      {pedidos.map((p, i) => (
        <PedidoItem
          key={p.id}
          pedido={p}
          index={i}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}