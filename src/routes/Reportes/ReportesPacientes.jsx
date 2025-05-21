import "./Reportes.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const COLORS = ["#16a34a", "#2563eb", "#f59e42", "#ef4444"];

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

  // Calcular totales para el gráfico
  const totalMuySatisfecho = respuestas.filter(
    (r) =>
      r.satisfaccion === "muy-satisfecho" || r.satisfaccion === "muy satisfecho"
  ).length;
  const totalSatisfecho = respuestas.filter(
    (r) => r.satisfaccion === "satisfecho"
  ).length;
  const totalPocoSatisfecho = respuestas.filter(
    (r) =>
      r.satisfaccion === "poco satisfecho" ||
      r.satisfaccion === "poco-satisfecho"
  ).length;
  const totalNadaSatisfecho = respuestas.filter(
    (r) =>
      r.satisfaccion === "nada satisfecho" ||
      r.satisfaccion === "nada-satisfecho"
  ).length;

  const totalRespuestas =
    totalMuySatisfecho +
    totalSatisfecho +
    totalPocoSatisfecho +
    totalNadaSatisfecho;

  const dataPie = [
    {
      name: "Muy Satisfecho",
      value: totalMuySatisfecho,
      percentage: ((totalMuySatisfecho / totalRespuestas) * 100).toFixed(1),
    },
    {
      name: "Satisfecho",
      value: totalSatisfecho,
      percentage: ((totalSatisfecho / totalRespuestas) * 100).toFixed(1),
    },
    {
      name: "Poco Satisfecho",
      value: totalPocoSatisfecho,
      percentage: ((totalPocoSatisfecho / totalRespuestas) * 100).toFixed(1),
    },
    {
      name: "Nada Satisfecho",
      value: totalNadaSatisfecho,
      percentage: ((totalNadaSatisfecho / totalRespuestas) * 100).toFixed(1),
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}>
          <p>{`${payload[0].name}: ${payload[0].payload.percentage}%`}</p>
          <p style={{ margin: 0 }}>{`(${payload[0].value} respuestas)`}</p>
        </div>
      );
    }
    return null;
  };

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
        <div
          className="table-container"
          style={{ overflowX: "auto", margin: "0 -1rem" }}>
          <table
            className="respuestas-table"
            style={{
              minWidth: "600px",
              fontSize: "0.9rem",
              margin: "0 1rem",
            }}>
            <thead>
              <tr>
                <th style={{ padding: "0.5rem" }}>
                  {agrupacion === "dia"
                    ? "Día"
                    : agrupacion === "semana"
                    ? "Semana"
                    : agrupacion === "mes"
                    ? "Mes"
                    : "Año"}
                </th>
                <th style={{ padding: "0.5rem" }}>Total</th>
                <th style={{ padding: "0.5rem" }}>Muy sat.</th>
                <th style={{ padding: "0.5rem" }}>Sat.</th>
                <th style={{ padding: "0.5rem" }}>Poco sat.</th>
                <th style={{ padding: "0.5rem" }}>Nada sat.</th>
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
                    <td style={{ padding: "0.5rem" }}>{grupo.periodo}</td>
                    <td style={{ padding: "0.5rem" }}>{grupo.total}</td>
                    <td style={{ padding: "0.5rem" }}>{grupo.muySatisfecho}</td>
                    <td style={{ padding: "0.5rem" }}>{grupo.satisfecho}</td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.pocoSatisfecho}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.nadaSatisfecho}
                    </td>
                  </tr>
                  {expandidos.includes(grupo.periodo) && (
                    <tr key={grupo.periodo + "-detalles"}>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: 8,
                            margin: 0,
                            padding: "0.5rem",
                            overflowX: "auto",
                          }}>
                          <table
                            className="respuestas-table"
                            style={{
                              margin: 0,
                              minWidth: "600px",
                              fontSize: "0.9rem",
                            }}>
                            <thead>
                              <tr>
                                <th style={{ padding: "0.5rem" }}>Fecha</th>
                                <th style={{ padding: "0.5rem" }}>Nombre</th>
                                <th style={{ padding: "0.5rem" }}>
                                  Satisfacción
                                </th>
                                <th style={{ padding: "0.5rem" }}>Mejora</th>
                              </tr>
                            </thead>
                            <tbody>
                              {grupo.detalles.map((respuesta, i) => (
                                <tr key={i}>
                                  <td style={{ padding: "0.5rem" }}>
                                    {new Date(
                                      respuesta.fecha
                                    ).toLocaleDateString()}
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    {respuesta.nombre || "-"}
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    <span
                                      className={`satisfaction-badge ${respuesta.satisfaccion
                                        .toLowerCase()
                                        .replace(" ", "-")}`}>
                                      {respuesta.satisfaccion}
                                    </span>
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    {respuesta.mejora || "-"}
                                  </td>
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
        {/* Pie Chart debajo de la tabla */}
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            margin: "2rem auto",
            padding: "0 1rem",
          }}>
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Distribución de Satisfacción
          </h3>
          <ResponsiveContainer width="100%" aspect={1}>
            <PieChart>
              <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                // label={(entry) => `${entry.name} (${entry.percentage}%)`}
                label={(entry) => `${entry.percentage}%`}
                labelLine={true}>
                {dataPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
