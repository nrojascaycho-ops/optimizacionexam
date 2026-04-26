import { useState } from "react";
import "./styles.css";

export default function App() {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    producto: "",
    cantidad: "",
    estado: "",
    pago: ""
  });

  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = () => {
    if (!form.nombre) return;

    if (editandoId) {
      setPedidos(
        pedidos.map((p) =>
          p.id === editandoId ? { ...form, id: editandoId } : p
        )
      );
      setEditandoId(null);
    } else {
      setPedidos([...pedidos, { ...form, id: Date.now() }]);
    }

    setForm({
      nombre: "",
      apellido: "",
      producto: "",
      cantidad: "",
      estado: "",
      pago: ""
    });
  };

  const eliminar = (id) => {
    setPedidos(pedidos.filter((p) => p.id !== id));
  };

  const editar = (pedido) => {
    setForm(pedido);
    setEditandoId(pedido.id);
  };

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div>☁ Sem4-Pc1</div>

        <div className="menu">
          <span className="active">Gestión de Pedidos</span>
          <span>Clientes</span>
          <span>Productos</span>
        </div>

        <div className="user">Rojas Caycho</div>
      </div>

      <div className="container">
        {/* FORMULARIO */}
        <div className="formulario">
          <h3>Ingrese los Datos</h3>

          <div className="form-grid">
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
            <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
            <input name="producto" placeholder="Producto" value={form.producto} onChange={handleChange} />
            <input name="cantidad" type="number" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} />

            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="">Seleccione estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <select name="pago" value={form.pago} onChange={handleChange}>
              <option value="">Seleccione pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="qr">QR</option>
            </select>

            <button className="btn-main" onClick={guardar}>
              {editandoId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>

        {/* LISTA */}
        <h3>Pedidos Recientes</h3>

        {pedidos.map((p) => (
          <div key={p.id} className="pedido">
            {editandoId === p.id ? (
              <div className="form-grid">
                <input name="nombre" value={form.nombre} onChange={handleChange} />
                <input name="apellido" value={form.apellido} onChange={handleChange} />
                <input name="producto" value={form.producto} onChange={handleChange} />
                <input name="cantidad" value={form.cantidad} onChange={handleChange} />

                <select name="estado" value={form.estado} onChange={handleChange}>
                  <option value="pendiente">Pendiente</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>

                <select name="pago" value={form.pago} onChange={handleChange}>
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="qr">QR</option>
                </select>

                <button className="btn-main" onClick={guardar}>
                  Guardar
                </button>

                <button className="delete" onClick={() => setEditandoId(null)}>
                  X
                </button>
              </div>
            ) : (
              <div className="pedido-simple">
                <span>
                  {p.nombre} {p.apellido} — {p.producto} (x{p.cantidad}) — {p.estado} — {p.pago}
                </span>

                <div className="actions">
                  <button className="edit" onClick={() => editar(p)}>
                    Editar
                  </button>

                  <button className="delete" onClick={() => eliminar(p.id)}>
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}