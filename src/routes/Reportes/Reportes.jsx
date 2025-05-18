import "./Reportes.css";
import { useLoaderData } from "react-router-dom";
import { FaUserInjured, FaUserMd, FaBuilding } from "react-icons/fa";

export default function Reportes() {
  const data = useLoaderData();

  return (
    <div className="reportes-container">
      <h1>Estadísticas Generales</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUserInjured />
          </div>
          <div className="stat-content">
            <h3>Pacientes</h3>
            <p className="stat-number">{data.pacientes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUserMd />
          </div>
          <div className="stat-content">
            <h3>Médicos</h3>
            <p className="stat-number">{data.medicos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBuilding />
          </div>
          <div className="stat-content">
            <h3>Empresas</h3>
            <p className="stat-number">{data.empresas}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
