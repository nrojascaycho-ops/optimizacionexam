import PedidoItem from "./PedidoItem";

export default function PedidoList({ pedidos, onDelete, onUpdate }) {
  return (
    <>
      {pedidos.map((p) => (
        <PedidoItem
          key={p.id}
          pedido={p}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
}