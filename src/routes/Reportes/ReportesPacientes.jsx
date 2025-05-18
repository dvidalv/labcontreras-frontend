import "./Reportes.css";

export default function ReportesPacientes() {
  return (
    <div className="reporte-detalle">
      <h2>Reporte de Pacientes</h2>
      <div className="date-range-container">
        <div className="date-input-group">
          <label htmlFor="fecha-desde">Desde:</label>
          <input type="date" id="fecha-desde" className="date-input" />
        </div>
        <div className="date-input-group">
          <label htmlFor="fecha-hasta">Hasta:</label>
          <input type="date" id="fecha-hasta" className="date-input" />
        </div>
      </div>
      <div className="reporte-content">
        {/* Aquí irá el contenido específico del reporte de pacientes */}
      </div>
    </div>
  );
}
