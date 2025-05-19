import "./Reportes.css";
import {
  useLoaderData,
  useNavigate,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { FaUserInjured, FaUserMd, FaBuilding } from "react-icons/fa";
import { useCallback } from "react";

export default function Reportes() {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCardClick = (route) => {
    navigate(route + window.location.search); // Mantener los query params al navegar
  };

  // Fechas desde los query params o vacío
  const fechaDesde = searchParams.get("fechaDesde") || "";
  const fechaHasta = searchParams.get("fechaHasta") || "";

  // Manejar cambios en los inputs de fecha
  const handleFechaChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
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
          />
        </div>
      </div>
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
