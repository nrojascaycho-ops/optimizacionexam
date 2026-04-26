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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = () => {
    if (!form.nombre) return;

    if (editandoId !== null) {
      setPedidos(pedidos.map(p =>
        p.id === editandoId ? { ...form, id: editandoId } : p
      ));
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
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  const editar = (p) => {
    setForm(p);
    setEditandoId(p.id);
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
        <div className="card">
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

            <button type="button" className="btn-main" onClick={guardar}>
              {editandoId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>

        {/* LISTA */}
        <h3>Pedidos Recientes</h3>

        {pedidos.map(p => (
          <div key={p.id} className="card">

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

                <button type="button" className="btn-main" onClick={guardar}>
                  Guardar
                </button>

                <button type="button" className="delete" onClick={() => setEditandoId(null)}>
                  ✖
                </button>
              </div>
            ) : (
              <div className="fila">
                <span>
                  <b>{p.nombre} {p.apellido}</b> — {p.producto} (x{p.cantidad})
                </span>

                <div className="actions">
                  <span className={`badge ${p.estado}`}>{p.estado}</span>
                  <span className="badge pago">{p.pago}</span>

                  <button className="edit" onClick={() => editar(p)}>Editar</button>
                  <button className="delete" onClick={() => eliminar(p.id)}>✖</button>
                </div>
              </div>
            )}

          </div>
        ))}

      </div>
    </>
  );
}