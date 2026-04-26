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
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    producto: "",
    cantidad: "",
    estado: "",
    pago: ""
  });

  // 🔥 FIREBASE
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      setPedidos(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    return () => unsub();
  }, []);

  // FORM ARRIBA
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  // 🔥 EDITAR
  const iniciarEdicion = (p) => {
    setEditId(p.id);
    setEditData(p);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const actualizar = async () => {
    await updateDoc(doc(db, "pedidos", editId), {
      ...editData,
      cantidad: Number(editData.cantidad)
    });
    setEditId(null);
  };

  const eliminar = async (id) => {
    await deleteDoc(doc(db, "pedidos", id));
  };

  return (
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

      <h3>Pedidos Recientes</h3>

      {pedidos.map(p => (

        <div key={p.id} className="card">

          {/* 🔴 MODO EDITAR */}
          {editId === p.id ? (
            <div className="form-grid">

              <input name="nombre" value={editData.nombre} onChange={handleEditChange}/>
              <input name="apellido" value={editData.apellido} onChange={handleEditChange}/>
              <input name="producto" value={editData.producto} onChange={handleEditChange}/>
              <input name="cantidad" value={editData.cantidad} onChange={handleEditChange}/>

              <select name="estado" value={editData.estado} onChange={handleEditChange}>
                <option value="pendiente">Pendiente</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>

              <select name="pago" value={editData.pago} onChange={handleEditChange}>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="qr">QR</option>
              </select>

              <button className="btn-main" onClick={actualizar}>
                Actualizar
              </button>

              <button className="delete" onClick={() => setEditId(null)}>
                ✖
              </button>

            </div>
          ) : (

            /* 🟢 VISTA NORMAL */
            <div className="pedido-item">

              <div>
                <strong>{p.nombre} {p.apellido}</strong>
                <div>{p.producto} (x{p.cantidad})</div>

                <div className="badges">
                  <span className={`estado ${p.estado}`}>{p.estado}</span>
                  <span className="pago">{p.pago}</span>
                </div>
              </div>

              <div className="actions">
                <button className="edit" onClick={() => iniciarEdicion(p)}>
                  ✏ Editar
                </button>
                <button className="delete" onClick={() => eliminar(p.id)}>
                  ✖
                </button>
              </div>

            </div>
          )}

        </div>
      ))}

    </div>
  );
}