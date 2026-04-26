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

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    producto: "",
    cantidad: "",
    estado: "",
    pago: ""
  });

  // 🔥 LISTAR FIREBASE
useEffect(() => {
  const unsub = onSnapshot(collection(db, "pedidos"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("🔥 DATOS FIREBASE:", data); // 👈 CLAVE
    setPedidos(data);
  });

  return () => unsub();
}, []);

  // 🔥 GUARDAR / ACTUALIZAR
  const guardar = async () => {
    if (!form.nombre || !form.producto) return;

    if (editId) {
      await updateDoc(doc(db, "pedidos", editId), {
        ...form,
        cantidad: Number(form.cantidad)
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "pedidos"), {
        ...form,
        cantidad: Number(form.cantidad)
      });
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

  // 🔥 EDITAR (carga al formulario)
  const editar = (p) => {
    setForm(p);
    setEditId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

        {/* FORM */}
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
              {editId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>

        {/* LISTA BONITA */}
        <h3>Pedidos Recientes</h3>

        {pedidos.map(p => (
          <div key={p.id} className="card pedido-item">

            <div>
              <strong>{p.nombre} {p.apellido}</strong> — {p.producto} (x{p.cantidad})
            </div>

            <div className="badges">
              <span className={`estado ${p.estado}`}>{p.estado}</span>
              <span className="pago">{p.pago}</span>
            </div>

            <div className="actions">
              <button className="edit" onClick={() => editar(p)}>✏ Editar</button>
              <button className="delete" onClick={() => eliminar(p.id)}>✖</button>
            </div>

          </div>
        ))}

      </div>
    </>
  );
}