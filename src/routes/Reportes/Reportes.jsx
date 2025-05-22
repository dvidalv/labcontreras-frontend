import "./Reportes.css";
import {
  useLoaderData,
  useNavigate,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { FaUserInjured, FaUserMd, FaBuilding } from "react-icons/fa";
import { useCallback, useState } from "react";

export default function Reportes() {
  const data = useLoaderData();
  // console.log(data);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  const handleCardClick = (route) => {
    navigate(route + window.location.search); // Mantener los query params al navegar
  };

  // Fechas desde los query params o vacío
  const fechaDesde = searchParams.get("fechaDesde") || "";
  const fechaHasta = searchParams.get("fechaHasta") || "";

  // Validar si una fecha es futura
  const isFutureDate = (date) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
  };

  // Manejar cambios en los inputs de fecha
  const handleFechaChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Validar si es fecha futura
      if (isFutureDate(value)) {
        setError("La fecha no puede ser una fecha futura");
        return;
      }

      // Validar que fecha hasta no sea menor que fecha desde
      if (name === "fechaHasta" && fechaDesde && value < fechaDesde) {
        setError("La fecha final no puede ser menor que la fecha inicial");
        return;
      }

      if (name === "fechaDesde" && fechaHasta && value > fechaHasta) {
        setError("La fecha inicial no puede ser mayor que la fecha final");
        return;
      }

      // Si pasa las validaciones, limpiar error y actualizar params
      setError("");
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams, fechaDesde, fechaHasta]
  );

  return (
    <div className="reportes-container">
      <h1>Estadísticas Generales</h1>
      <div className="date-range-container">
        <div className="date-input-group">
          <label htmlFor="fecha-desde-general">Desde:</label>
          <input
            type="date"
            id="fecha-desde-general"
            name="fechaDesde"
            className="date-input"
            value={fechaDesde}
            onChange={handleFechaChange}
            max={new Date().toISOString().split("T")[0]} // Prevenir selección de fechas futuras
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="fecha-hasta-general">Hasta:</label>
          <input
            type="date"
            id="fecha-hasta-general"
            name="fechaHasta"
            className="date-input"
            value={fechaHasta}
            onChange={handleFechaChange}
            max={new Date().toISOString().split("T")[0]} // Prevenir selección de fechas futuras
            min={fechaDesde} // La fecha final no puede ser menor que la inicial
          />
        </div>
      </div>
      {error && (
        <div
          className="error-message"
          style={{
            color: "#dc2626",
            backgroundColor: "#fee2e2",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
          <span role="img" aria-label="warning">
            ⚠️
          </span>
          {error}
        </div>
      )}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => handleCardClick("pacientes")}>
          <div className="stat-icon">
            <FaUserInjured />
          </div>
          <div className="stat-content">
            <h3>Pacientes</h3>
            <p className="stat-number">{data.pacientes}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => handleCardClick("medicos")}>
          <div className="stat-icon">
            <FaUserMd />
          </div>
          <div className="stat-content">
            <h3>Médicos</h3>
            <p className="stat-number">{data.medicos}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => handleCardClick("empresas")}>
          <div className="stat-icon">
            <FaBuilding />
          </div>
          <div className="stat-content">
            <h3>Empresas</h3>
            <p className="stat-number">{data.empresas}</p>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
