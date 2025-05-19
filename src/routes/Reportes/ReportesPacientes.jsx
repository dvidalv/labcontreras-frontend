import "./Reportes.css";
import { useLoaderData, useSubmit, useSearchParams } from "react-router-dom";
import { useState } from "react";
import React from "react";

function getPeriodKey(date, agrupacion) {
  const d = new Date(date);
  if (agrupacion === "dia") {
    return d.toLocaleDateString();
  } else if (agrupacion === "semana") {
    // Semana ISO: año + semana
    const year = d.getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const pastDaysOfYear = (d - firstDayOfYear) / 86400000;
    const week = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    return `${year}-Semana ${week}`;
  } else if (agrupacion === "mes") {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  } else if (agrupacion === "año") {
    return `${d.getFullYear()}`;
  }
  return "";
}

function agruparRespuestas(respuestas, agrupacion) {
  const grupos = {};
  respuestas.forEach((r) => {
    const key = getPeriodKey(r.fecha, agrupacion);
    if (!grupos[key]) {
      grupos[key] = {
        periodo: key,
        total: 0,
        muySatisfecho: 0,
        satisfecho: 0,
        pocoSatisfecho: 0,
        nadaSatisfecho: 0,
        detalles: [],
      };
    }
    grupos[key].total++;
    if (
      r.satisfaccion === "muy-satisfecho" ||
      r.satisfaccion === "muy satisfecho"
    )
      grupos[key].muySatisfecho++;
    else if (r.satisfaccion === "satisfecho") grupos[key].satisfecho++;
    else if (
      r.satisfaccion === "poco satisfecho" ||
      r.satisfaccion === "poco-satisfecho"
    )
      grupos[key].pocoSatisfecho++;
    else if (
      r.satisfaccion === "nada satisfecho" ||
      r.satisfaccion === "nada-satisfecho"
    )
      grupos[key].nadaSatisfecho++;
    grupos[key].detalles.push(r);
  });
  return Object.values(grupos).sort((a, b) =>
    a.periodo.localeCompare(b.periodo)
  );
}

export default function ReportesPacientes() {
  const respuestas = useLoaderData();
  const [agrupacion, setAgrupacion] = useState("dia");
  const [expandidos, setExpandidos] = useState([]); // array de periodos expandidos

  if (!respuestas || respuestas.length === 0) {
    return (
      <div className="reporte-detalle">
        <h2>Reporte de Pacientes</h2>
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  const agrupadas = agruparRespuestas(respuestas, agrupacion);

  const toggleExpand = (periodo) => {
    setExpandidos((prev) =>
      prev.includes(periodo)
        ? prev.filter((p) => p !== periodo)
        : [...prev, periodo]
    );
  };

  return (
    <div className="reporte-detalle">
      <h2>Reporte de Pacientes</h2>
      <div className="filters-container">
        <div className="filter-group">
          <label>Ver resultados por:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn${agrupacion === "dia" ? " active" : ""}`}
              onClick={() => setAgrupacion("dia")}>
              Por día
            </button>
            <button
              className={`filter-btn${
                agrupacion === "semana" ? " active" : ""
              }`}
              onClick={() => setAgrupacion("semana")}>
              Por semana
            </button>
            <button
              className={`filter-btn${agrupacion === "mes" ? " active" : ""}`}
              onClick={() => setAgrupacion("mes")}>
              Por mes
            </button>
            <button
              className={`filter-btn${agrupacion === "año" ? " active" : ""}`}
              onClick={() => setAgrupacion("año")}>
              Por año
            </button>
          </div>
        </div>
      </div>
      <div className="reporte-content">
        <div className="table-container">
          <table className="respuestas-table">
            <thead>
              <tr>
                <th>
                  {agrupacion === "dia"
                    ? "Día"
                    : agrupacion === "semana"
                    ? "Semana"
                    : agrupacion === "mes"
                    ? "Mes"
                    : "Año"}
                </th>
                <th>Total respuestas</th>
                <th>Muy satisfecho</th>
                <th>Satisfecho</th>
                <th>Poco satisfecho</th>
                <th>Nada satisfecho</th>
              </tr>
            </thead>
            <tbody>
              {agrupadas.map((grupo) => (
                <React.Fragment key={grupo.periodo}>
                  <tr
                    style={{
                      cursor: "pointer",
                      background: expandidos.includes(grupo.periodo)
                        ? "#f0f4fa"
                        : "",
                    }}
                    onClick={() => toggleExpand(grupo.periodo)}>
                    <td>{grupo.periodo}</td>
                    <td>{grupo.total}</td>
                    <td>{grupo.muySatisfecho}</td>
                    <td>{grupo.satisfecho}</td>
                    <td>{grupo.pocoSatisfecho}</td>
                    <td>{grupo.nadaSatisfecho}</td>
                  </tr>
                  {expandidos.includes(grupo.periodo) && (
                    <tr key={grupo.periodo + "-detalles"}>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: 8,
                            margin: 0,
                            padding: "0.5rem 0.5rem 0.5rem 1.5rem",
                          }}>
                          <table
                            className="respuestas-table"
                            style={{ margin: 0 }}>
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Nombre</th>
                                <th>Nivel de Satisfacción</th>
                                <th>Mejora</th>
                              </tr>
                            </thead>
                            <tbody>
                              {grupo.detalles.map((respuesta, i) => (
                                <tr key={i}>
                                  <td>
                                    {new Date(
                                      respuesta.fecha
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>{respuesta.nombre || "-"}</td>
                                  <td>
                                    <span
                                      className={`satisfaction-badge ${respuesta.satisfaccion
                                        .toLowerCase()
                                        .replace(" ", "-")}`}>
                                      {respuesta.satisfaccion}
                                    </span>
                                  </td>
                                  <td>{respuesta.mejora || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
