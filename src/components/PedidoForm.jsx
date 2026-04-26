import { useState } from "react";

export default function PedidoForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState("");
  const [estado, setEstado] = useState(""); // 🔥 vacío por defecto

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 VALIDAR TODO
    if (!nombre || !producto || !estado) {
      alert("Completa todos los campos");
      return;
    }

    onAdd({ nombre, producto, estado });

    setNombre("");
    setProducto("");
    setEstado("");
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>

        <h3>Rellene el formulario</h3>

        {/* NOMBRE */}
        <label>Nombre</label>
        <input
          placeholder="Ingrese nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* PRODUCTO */}
        <label>Producto</label>
        <input
          placeholder="Ingrese producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />

        {/* ESTADO */}
        <label>Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Seleccione estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <br />

        <button className="btn-save">
          Guardar
        </button>

      </form>
    </div>
  );
}