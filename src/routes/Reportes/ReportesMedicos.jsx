import "./Reportes.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
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
        entregaOportunaSi: 0,
        entregaOportunaNo: 0,
        informesClarosSi: 0,
        informesClarosNo: 0,
        diagnosticosUtiles: 0,
        diagnosticosNoConcluyentes: 0,
        diagnosticosSinBeneficio: 0,
        metodosModernos: 0,
        metodosExcesivos: 0,
        metodosObsoletos: 0,
        detalles: [],
      };
    }
    grupos[key].total++;

    // Conteo de satisfacción
    if (r.satisfaccion === "muy-satisfecho") grupos[key].muySatisfecho++;
    else if (r.satisfaccion === "satisfecho") grupos[key].satisfecho++;
    else if (r.satisfaccion === "poco-satisfecho") grupos[key].pocoSatisfecho++;
    else if (r.satisfaccion === "nada-satisfecho") grupos[key].nadaSatisfecho++;

    // Conteo de entrega oportuna
    if (r.entregaOportuna === "si") grupos[key].entregaOportunaSi++;
    else if (r.entregaOportuna === "no") grupos[key].entregaOportunaNo++;

    // Conteo de informes claros
    if (r.informesClaros === "si") grupos[key].informesClarosSi++;
    else if (r.informesClaros === "no") grupos[key].informesClarosNo++;

    // Conteo de utilidad de diagnósticos
    if (r.utilidadDiagnosticos === "utiles") grupos[key].diagnosticosUtiles++;
    else if (r.utilidadDiagnosticos === "no-concluyentes")
      grupos[key].diagnosticosNoConcluyentes++;
    else if (r.utilidadDiagnosticos === "sin-beneficio")
      grupos[key].diagnosticosSinBeneficio++;

    // Conteo de métodos técnicos
    if (r.metodosTecnicos === "modernos") grupos[key].metodosModernos++;
    else if (r.metodosTecnicos === "excesivos") grupos[key].metodosExcesivos++;
    else if (r.metodosTecnicos === "obsoletos") grupos[key].metodosObsoletos++;

    grupos[key].detalles.push(r);
  });
  return Object.values(grupos).sort((a, b) =>
    a.periodo.localeCompare(b.periodo)
  );
}

const COLORS = ["#16a34a", "#2563eb", "#f59e42", "#ef4444"];

export default function ReportesMedicos() {
  const respuestas = useLoaderData();
  console.log("respuestas", respuestas);
  const [agrupacion, setAgrupacion] = useState("dia");
  const [expandidos, setExpandidos] = useState([]); // array de periodos expandidos

  if (!respuestas || respuestas.length === 0) {
    return (
      <div className="reporte-detalle">
        <h2>Reporte de Médicos</h2>
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  const agrupadas = agruparRespuestas(respuestas, agrupacion);

  // Calcular totales para el gráfico de informes claros
  const totalInformesClarosSi = respuestas.filter(
    (r) => r.informesClaros === "si"
  ).length;
  const totalInformesClarosNo = respuestas.filter(
    (r) => r.informesClaros === "no"
  ).length;

  const totalInformes = totalInformesClarosSi + totalInformesClarosNo;

  const dataPieInformes = [
    {
      name: "Informes Claros",
      value: totalInformesClarosSi,
      percentage: ((totalInformesClarosSi / totalInformes) * 100).toFixed(1),
    },
    {
      name: "Informes No Claros",
      value: totalInformesClarosNo,
      percentage: ((totalInformesClarosNo / totalInformes) * 100).toFixed(1),
    },
  ];

  // Calcular totales para el gráfico de diagnósticos
  const totalDiagnosticosUtiles = respuestas.filter(
    (r) => r.utilidadDiagnosticos === "utiles"
  ).length;
  const totalDiagnosticosNoConcluyentes = respuestas.filter(
    (r) => r.utilidadDiagnosticos === "no-concluyentes"
  ).length;
  const totalDiagnosticosSinBeneficio = respuestas.filter(
    (r) => r.utilidadDiagnosticos === "sin-beneficio"
  ).length;

  const totalDiagnosticos =
    totalDiagnosticosUtiles +
    totalDiagnosticosNoConcluyentes +
    totalDiagnosticosSinBeneficio;

  const dataPieDiagnosticos = [
    {
      name: "Útiles",
      value: totalDiagnosticosUtiles,
      percentage: ((totalDiagnosticosUtiles / totalDiagnosticos) * 100).toFixed(
        1
      ),
    },
    {
      name: "No Concluyentes",
      value: totalDiagnosticosNoConcluyentes,
      percentage: (
        (totalDiagnosticosNoConcluyentes / totalDiagnosticos) *
        100
      ).toFixed(1),
    },
    {
      name: "Sin Beneficio",
      value: totalDiagnosticosSinBeneficio,
      percentage: (
        (totalDiagnosticosSinBeneficio / totalDiagnosticos) *
        100
      ).toFixed(1),
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

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        payload: PropTypes.shape({
          percentage: PropTypes.string,
        }),
      })
    ),
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
      <h2>Reporte de Médicos</h2>
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
                <th style={{ padding: "0.5rem" }}>Muy Satisfecho</th>
                <th style={{ padding: "0.5rem" }}>Satisfecho</th>
                <th style={{ padding: "0.5rem" }}>Poco Satisfecho</th>
                <th style={{ padding: "0.5rem" }}>Nada Satisfecho</th>
                <th style={{ padding: "0.5rem" }}>Entrega Oportuna Sí</th>
                <th style={{ padding: "0.5rem" }}>Entrega Oportuna No</th>
                <th style={{ padding: "0.5rem" }}>Informes Claros Sí</th>
                <th style={{ padding: "0.5rem" }}>Informes Claros No</th>
                <th style={{ padding: "0.5rem" }}>Diag. Útiles</th>
                <th style={{ padding: "0.5rem" }}>Diag. No Concluyentes</th>
                <th style={{ padding: "0.5rem" }}>Diag. Sin Beneficio</th>
                <th style={{ padding: "0.5rem" }}>Métodos Modernos</th>
                <th style={{ padding: "0.5rem" }}>Métodos Excesivos</th>
                <th style={{ padding: "0.5rem" }}>Métodos Obsoletos</th>
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
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.entregaOportunaSi}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.entregaOportunaNo}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.informesClarosSi}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.informesClarosNo}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.diagnosticosUtiles}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.diagnosticosNoConcluyentes}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.diagnosticosSinBeneficio}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.metodosModernos}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.metodosExcesivos}
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      {grupo.metodosObsoletos}
                    </td>
                  </tr>
                  {expandidos.includes(grupo.periodo) && (
                    <tr key={grupo.periodo + "-detalles"}>
                      <td colSpan={16} style={{ padding: 0 }}>
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
                                <th style={{ padding: "0.5rem" }}>
                                  Entrega Oportuna
                                </th>
                                <th style={{ padding: "0.5rem" }}>
                                  Informes Claros
                                </th>
                                <th style={{ padding: "0.5rem" }}>
                                  Utilidad Diagnósticos
                                </th>
                                <th style={{ padding: "0.5rem" }}>
                                  Métodos Técnicos
                                </th>
                                <th style={{ padding: "0.5rem" }}>
                                  Sugerencias
                                </th>
                                <th style={{ padding: "0.5rem" }}>
                                  Comentarios
                                </th>
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
                                      className={`satisfaction-badge ${
                                        respuesta.satisfaccion ===
                                        "muy-satisfecho"
                                          ? "muy-satisfecho"
                                          : respuesta.satisfaccion ===
                                            "satisfecho"
                                          ? "satisfecho"
                                          : respuesta.satisfaccion ===
                                            "poco-satisfecho"
                                          ? "poco-satisfecho"
                                          : "nada-satisfecho"
                                      }`}>
                                      {respuesta.satisfaccion ===
                                      "muy-satisfecho"
                                        ? "Muy Satisfecho"
                                        : respuesta.satisfaccion ===
                                          "satisfecho"
                                        ? "Satisfecho"
                                        : respuesta.satisfaccion ===
                                          "poco-satisfecho"
                                        ? "Poco Satisfecho"
                                        : "Nada Satisfecho"}
                                    </span>
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    <span
                                      className={`satisfaction-badge ${
                                        respuesta.entregaOportuna === "si"
                                          ? "muy-satisfecho"
                                          : "nada-satisfecho"
                                      }`}>
                                      {respuesta.entregaOportuna === "si"
                                        ? "Sí"
                                        : "No"}
                                    </span>
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    <span
                                      className={`satisfaction-badge ${
                                        respuesta.informesClaros === "si"
                                          ? "muy-satisfecho"
                                          : "nada-satisfecho"
                                      }`}>
                                      {respuesta.informesClaros === "si"
                                        ? "Sí"
                                        : "No"}
                                    </span>
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    <span
                                      className={`satisfaction-badge ${
                                        respuesta.utilidadDiagnosticos ===
                                        "utiles"
                                          ? "muy-satisfecho"
                                          : respuesta.utilidadDiagnosticos ===
                                            "no-concluyentes"
                                          ? "poco-satisfecho"
                                          : "nada-satisfecho"
                                      }`}>
                                      {respuesta.utilidadDiagnosticos ===
                                      "utiles"
                                        ? "Útiles"
                                        : respuesta.utilidadDiagnosticos ===
                                          "no-concluyentes"
                                        ? "No Concluyentes"
                                        : "Sin Beneficio"}
                                    </span>
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    <span
                                      className={`satisfaction-badge ${
                                        respuesta.metodosTecnicos === "modernos"
                                          ? "muy-satisfecho"
                                          : respuesta.metodosTecnicos ===
                                            "excesivos"
                                          ? "poco-satisfecho"
                                          : "nada-satisfecho"
                                      }`}>
                                      {respuesta.metodosTecnicos === "modernos"
                                        ? "Modernos"
                                        : respuesta.metodosTecnicos ===
                                          "excesivos"
                                        ? "Excesivos"
                                        : "Obsoletos"}
                                    </span>
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    {respuesta.sugerencias || "-"}
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    {respuesta.comentarios || "-"}
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
        {/* Pie Charts */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "2rem",
          }}>
          {/* Gráfico de Informes Claros */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Claridad de los Informes
            </h3>
            <ResponsiveContainer width="100%" aspect={1}>
              <PieChart>
                <Pie
                  data={dataPieInformes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={(entry) => `${entry.percentage}%`}
                  labelLine={true}>
                  {dataPieInformes.map((entry, index) => (
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
          {/* Gráfico de Utilidad de Diagnósticos */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Utilidad de los Diagnósticos
            </h3>
            <ResponsiveContainer width="100%" aspect={1}>
              <PieChart>
                <Pie
                  data={dataPieDiagnosticos}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={(entry) => `${entry.percentage}%`}
                  labelLine={true}>
                  {dataPieDiagnosticos.map((entry, index) => (
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
    </div>
  );
}
