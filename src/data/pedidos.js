let pedidos = [];

export const getPedidos = () => pedidos;

export const addPedido = (pedido) => {
  pedido.id = Date.now();
  pedidos.push(pedido);
};

export const deletePedido = (id) => {
  pedidos = pedidos.filter(p => p.id !== id);
};

export const updatePedido = (id, nuevo) => {
  pedidos = pedidos.map(p => p.id === id ? { ...p, ...nuevo } : p);
};