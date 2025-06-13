import "./Reportes.css";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import React from "react";
import Spinner from "../../components/Spinner/Spinner";
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
        atencionRapidaSi: 0,
        atencionRapidaNo: 0,
        personalAmableSi: 0,
        personalAmableNo: 0,
        instalacionesAdecuadas: 0,
        instalacionesMejorables: 0,
        instalacionesInadecuadas: 0,
        tecnologiaActualizada: 0,
        tecnologiaMejorable: 0,
        tecnologiaObsoleta: 0,
        detalles: [],
      };
    }
    grupos[key].total++;

    // Conteo de satisfacción
    if (r.satisfaccion === "muy-satisfecho") grupos[key].muySatisfecho++;
    else if (r.satisfaccion === "satisfecho") grupos[key].satisfecho++;
    else if (r.satisfaccion === "poco-satisfecho") grupos[key].pocoSatisfecho++;
    else if (r.satisfaccion === "nada-satisfecho") grupos[key].nadaSatisfecho++;

    // Conteo de atención rápida
    if (r.atencionRapida === "si") grupos[key].atencionRapidaSi++;
    else if (r.atencionRapida === "no") grupos[key].atencionRapidaNo++;

    // Conteo de personal amable
    if (r.personalAmable === "si") grupos[key].personalAmableSi++;
    else if (r.personalAmable === "no") grupos[key].personalAmableNo++;

    // Conteo de instalaciones
    if (r.instalaciones === "adecuadas") grupos[key].instalacionesAdecuadas++;
    else if (r.instalaciones === "mejorables")
      grupos[key].instalacionesMejorables++;
    else if (r.instalaciones === "inadecuadas")
      grupos[key].instalacionesInadecuadas++;

    // Conteo de tecnología
    if (r.tecnologia === "actualizada") grupos[key].tecnologiaActualizada++;
    else if (r.tecnologia === "mejorable") grupos[key].tecnologiaMejorable++;
    else if (r.tecnologia === "obsoleta") grupos[key].tecnologiaObsoleta++;

    grupos[key].detalles.push(r);
  });
  return Object.values(grupos).sort((a, b) =>
    a.periodo.localeCompare(b.periodo)
  );
}

const COLORS = ["#16a34a", "#2563eb", "#f59e42", "#ef4444"];

export default function ReportesEmpresas() {
  const rawRespuestas = useLoaderData();
  const navigation = useNavigation();
  const respuestas = Array.isArray(rawRespuestas)
    ? rawRespuestas.map((r) => ({
        ...r,
        atencionRapida: r.atencionRapida ?? r.oportuno ?? "no",
      }))
    : [];
  const [agrupacion, setAgrupacion] = useState("dia");
  const [expandidos, setExpandidos] = useState([]);
  const isLoading = navigation.state === "loading";
  const [searchParams] = useSearchParams();
  const fechaDesde = searchParams.get("fechaDesde") || "";
  const fechaHasta = searchParams.get("fechaHasta") || "";

  // Filtrar respuestas por fecha si se han seleccionado fechas
  const respuestasFiltradas = respuestas.filter((respuesta) => {
    if (!fechaDesde && !fechaHasta) return true;
    const fechaRespuesta = new Date(respuesta.fecha);
    const desde = fechaDesde ? new Date(fechaDesde) : null;
    const hasta = fechaHasta ? new Date(fechaHasta) : null;
    if (desde && hasta) {
      return fechaRespuesta >= desde && fechaRespuesta <= hasta;
    } else if (desde) {
      return fechaRespuesta >= desde;
    } else if (hasta) {
      return fechaRespuesta <= hasta;
    }
    return true;
  });

  if (isLoading) {
    return <Spinner size="large" message="Cargando datos de empresas..." />;
  }

  if (
    !rawRespuestas ||
    (rawRespuestas.error && !Array.isArray(rawRespuestas))
  ) {
    return (
      <div className="reporte-detalle">
        <h2>Reporte de Empresas</h2>
        <p className="error-message">
          {rawRespuestas?.message ||
            "Error al cargar los datos. Por favor, intente con un rango de fechas diferente."}
        </p>
      </div>
    );
  }

  if (respuestasFiltradas.length === 0) {
    return (
      <div className="reporte-detalle">
        <h2>Reporte de Empresas</h2>
        <p>No hay datos disponibles para el período seleccionado</p>
      </div>
    );
  }

  const agrupadas = agruparRespuestas(respuestasFiltradas, agrupacion);

  const toggleExpand = (periodo) => {
    setExpandidos((prev) =>
      prev.includes(periodo)
        ? prev.filter((p) => p !== periodo)
        : [...prev, periodo]
    );
  };

  // Calcular totales para el gráfico de satisfacción
  const totalMuySatisfecho = respuestasFiltradas.filter(
    (r) => r.satisfaccion === "muy-satisfecho"
  ).length;
  const totalSatisfecho = respuestasFiltradas.filter(
    (r) => r.satisfaccion === "satisfecho"
  ).length;
  const totalPocoSatisfecho = respuestasFiltradas.filter(
    (r) => r.satisfaccion === "poco-satisfecho"
  ).length;
  const totalNadaSatisfecho = respuestasFiltradas.filter(
    (r) => r.satisfaccion === "nada-satisfecho"
  ).length;
  const totalSatisfaccion =
    totalMuySatisfecho +
    totalSatisfecho +
    totalPocoSatisfecho +
    totalNadaSatisfecho;
  const dataPieSatisfaccion = [
    {
      name: "Muy Satisfecho",
      value: totalMuySatisfecho,
      percentage: ((totalMuySatisfecho / totalSatisfaccion) * 100).toFixed(1),
    },
    {
      name: "Satisfecho",
      value: totalSatisfecho,
      percentage: ((totalSatisfecho / totalSatisfaccion) * 100).toFixed(1),
    },
    {
      name: "Poco Satisfecho",
      value: totalPocoSatisfecho,
      percentage: ((totalPocoSatisfecho / totalSatisfaccion) * 100).toFixed(1),
    },
    {
      name: "Nada Satisfecho",
      value: totalNadaSatisfecho,
      percentage: ((totalNadaSatisfecho / totalSatisfaccion) * 100).toFixed(1),
    },
  ];

  // Calcular totales para el gráfico de atención rápida
  const totalAtencionSi = respuestasFiltradas.filter(
    (r) => r.atencionRapida === "si"
  ).length;
  const totalAtencionNo = respuestasFiltradas.filter(
    (r) => r.atencionRapida === "no"
  ).length;
  const totalAtencion = totalAtencionSi + totalAtencionNo;
  const dataPieAtencion = [
    {
      name: "Sí",
      value: totalAtencionSi,
      percentage: ((totalAtencionSi / totalAtencion) * 100).toFixed(1),
    },
    {
      name: "No",
      value: totalAtencionNo,
      percentage: ((totalAtencionNo / totalAtencion) * 100).toFixed(1),
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

  return (
    <div className="reporte-detalle">
      <h2>Reporte de Empresas</h2>
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
              minWidth: "400px",
              fontSize: "0.9rem",
              margin: "0 1rem",
              borderCollapse: "collapse",
            }}>
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
                <th>Total</th>
                <th colSpan={4}>Satisfacción</th>
                <th colSpan={2}>Atención Rápida</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>Muy Satis.</th>
                <th>Satis.</th>
                <th>Poco</th>
                <th>Nada</th>
                <th>Sí</th>
                <th>No</th>
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
                    <td>{grupo.atencionRapidaSi}</td>
                    <td>{grupo.atencionRapidaNo}</td>
                  </tr>
                  {expandidos.includes(grupo.periodo) && (
                    <tr key={grupo.periodo + "-detalles"}>
                      <td colSpan={8} style={{ padding: 0 }}>
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
                              minWidth: "400px",
                              fontSize: "0.9rem",
                            }}>
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Empresa</th>
                                <th>Satisfacción</th>
                                <th>Atención Rápida</th>
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
                                  <td>{respuesta.empresa || "-"}</td>
                                  <td>
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
                                  <td>
                                    <span
                                      className={`satisfaction-badge ${
                                        respuesta.atencionRapida === "si"
                                          ? "muy-satisfecho"
                                          : "nada-satisfecho"
                                      }`}>
                                      {respuesta.atencionRapida === "si"
                                        ? "Sí"
                                        : "No"}
                                    </span>
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "2rem",
          }}>
          {/* Gráfico de Satisfacción */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Distribución de Satisfacción
            </h3>
            <ResponsiveContainer width="100%" aspect={1}>
              <PieChart>
                <Pie
                  data={dataPieSatisfaccion}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={(entry) => `${entry.percentage}%`}
                  labelLine={true}>
                  {dataPieSatisfaccion.map((entry, index) => (
                    <Cell
                      key={`cell-sat-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Gráfico de Atención Rápida */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Distribución de Atención Rápida
            </h3>
            <ResponsiveContainer width="100%" aspect={1}>
              <PieChart>
                <Pie
                  data={dataPieAtencion}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={(entry) => `${entry.percentage}%`}
                  labelLine={true}>
                  {dataPieAtencion.map((entry, index) => (
                    <Cell
                      key={`cell-atencion-${index}`}
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
