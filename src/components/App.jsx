import { useEffect, useState } from "react";
import "../styles.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

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

  // 🔥 LEER FIREBASE
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      setPedidos(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    return () => unsub();
  }, []);

  // 🔥 INPUT ARRIBA
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 GUARDAR NUEVO
  const guardar = async () => {
    if (!form.nombre || !form.producto) return;

    await addDoc(collection(db, "pedidos"), {
      ...form,
      cantidad: Number(form.cantidad)
    });

    setForm({
      nombre: "",
      apellido: "",
      producto: "",
      cantidad: "",
      estado: "",
      pago: ""
    });
  };

  // 🔥 ACTUALIZAR ABAJO (EN VIVO)
  const actualizar = async (id, campo, valor) => {
    await updateDoc(doc(db, "pedidos", id), {
      [campo]: campo === "cantidad" ? Number(valor) : valor
    });
  };

  const eliminar = async (id) => {
    await deleteDoc(doc(db, "pedidos", id));
  };

  return (
    <>
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

        {/* FORM ARRIBA */}
        <div className="card">
          <h3>Ingrese los Datos</h3>

          <div className="form-grid">
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange}/>
            <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange}/>
            <input name="producto" placeholder="Producto" value={form.producto} onChange={handleChange}/>
            <input name="cantidad" type="number" placeholder="Cantidad" value={form.cantidad} onChange={handleChange}/>

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
              Guardar
            </button>
          </div>
        </div>

        {/* LISTA EDITABLE ABAJO */}
        <h3>Pedidos Recientes</h3>

        {pedidos.map(p => (
          <div key={p.id} className="card">
            <div className="form-grid">

              <input value={p.nombre} onChange={(e) => actualizar(p.id, "nombre", e.target.value)} />
              <input value={p.apellido} onChange={(e) => actualizar(p.id, "apellido", e.target.value)} />
              <input value={p.producto} onChange={(e) => actualizar(p.id, "producto", e.target.value)} />
              <input value={p.cantidad} onChange={(e) => actualizar(p.id, "cantidad", e.target.value)} />

              <select value={p.estado} onChange={(e) => actualizar(p.id, "estado", e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>

              <select value={p.pago} onChange={(e) => actualizar(p.id, "pago", e.target.value)}>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="qr">QR</option>
              </select>

              <button className="delete" onClick={() => eliminar(p.id)}>✖</button>

            </div>
          </div>
        ))}

      </div>
    </>
  );
}