import "./Reportes.css";
import { useLoaderData, useNavigate, Outlet } from "react-router-dom";
import { FaUserInjured, FaUserMd, FaBuilding } from "react-icons/fa";

export default function Reportes() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="reportes-container">
      <h1>Estadísticas Generales</h1>
      <div className="date-range-container">
        <div className="date-input-group">
          <label htmlFor="fecha-desde-general">Desde:</label>
          <input type="date" id="fecha-desde-general" className="date-input" />
        </div>
        <div className="date-input-group">
          <label htmlFor="fecha-hasta-general">Hasta:</label>
          <input type="date" id="fecha-hasta-general" className="date-input" />
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
