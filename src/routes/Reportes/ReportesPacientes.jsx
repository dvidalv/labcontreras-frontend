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

      <div className="filters-container">
        <div className="filter-group">
          <label>Nivel de Satisfacción:</label>
          <div className="filter-buttons">
            <button className="filter-btn">Muy satisfecho</button>
            <button className="filter-btn">Satisfecho</button>
            <button className="filter-btn">Poco satisfecho</button>
            <button className="filter-btn">Nada satisfecho</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Ver resultados por:</label>
          <div className="filter-buttons">
            <button className="filter-btn">Por día</button>
            <button className="filter-btn">Por semana</button>
            <button className="filter-btn">Por mes</button>
            <button className="filter-btn">Por año</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Mostrar:</label>
          <div className="filter-buttons">
            <button className="filter-btn">Todas las respuestas</button>
            <button className="filter-btn">Solo con sugerencias</button>
            <button className="filter-btn">Resumen estadístico</button>
          </div>
        </div>
      </div>

      <div className="reporte-content">
        {/* Aquí irá el contenido específico del reporte de pacientes */}
      </div>
    </div>
  );
}
