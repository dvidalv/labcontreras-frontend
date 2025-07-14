import styles from "./EditarComprobantes.module.css";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { TIPOS_ECF } from "../../utils/constants";
import { updateComprobante } from "../../utils/api";

export default function EditarComprobantes({
  setShowModal,
  showModal,
  token,
  refreshComprobantes,
  comprobante,
}) {
  const [form, setForm] = useState({
    rnc: "",
    razon_social: "",
    tipo_comprobante: "",
    descripcion_tipo: "",
    prefijo: "E",
    numero_inicial: "",
    numero_final: "",
    fecha_autorizacion: "",
    fecha_vencimiento: "",
    alerta_minima_restante: "",
    estado: "activo",
    comentario: "",
  });
  const [error, setError] = useState(null);

  // Referencias para hacer scroll
  const errorRef = useRef(null);
  const modalBodyRef = useRef(null);

  // Efecto para pre-llenar el formulario con los datos del comprobante
  useEffect(() => {
    if (comprobante) {
      console.log("=== LOADING COMPROBANTE DATA ===");
      console.log("Original comprobante:", comprobante);

      // Formatear las fechas para el input type="date"
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const formatted = date.toISOString().split("T")[0];
        console.log("Date formatting:", { original: dateString, formatted });
        return formatted;
      };

      const formData = {
        rnc: comprobante.rnc || "",
        razon_social: comprobante.razon_social || "",
        tipo_comprobante: comprobante.tipo_comprobante || "",
        descripcion_tipo: comprobante.descripcion_tipo || "",
        prefijo: comprobante.prefijo || "E",
        numero_inicial: Number(comprobante.numero_inicial) || "",
        numero_final: Number(comprobante.numero_final) || "",
        fecha_autorizacion: formatDate(comprobante.fecha_autorizacion),
        fecha_vencimiento: formatDate(comprobante.fecha_vencimiento),
        alerta_minima_restante:
          Number(comprobante.alerta_minima_restante) || "",
        estado: comprobante.estado || "activo",
        comentario: comprobante.comentario || "",
      };

      console.log("Formatted form data:", formData);
      console.log("numero_inicial type:", typeof formData.numero_inicial);
      console.log("numero_final type:", typeof formData.numero_final);

      setForm(formData);
    }
  }, [comprobante]);

  // Efecto para hacer scroll al error cuando aparezca
  useEffect(() => {
    if (error && errorRef.current && modalBodyRef.current) {
      // Hacer scroll al error dentro del modal
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  const cantidadNumeros =
    !form.numero_inicial ||
    form.numero_inicial === "" ||
    !form.numero_final ||
    form.numero_final === ""
      ? ""
      : Number(form.numero_final) - Number(form.numero_inicial) + 1;

  // Validaciones en tiempo real
  const isNumeroFinalValid = () => {
    if (!form.numero_inicial || !form.numero_final) return true;

    // Convertir ambos a números para comparación consistente
    const inicial = Number(form.numero_inicial);
    const final = Number(form.numero_final);

    // Verificar que ambos sean números válidos
    if (isNaN(inicial) || isNaN(final)) return false;

    const isValid = final > inicial;
    console.log("isNumeroFinalValid:", {
      inicial,
      final,
      inicialType: typeof form.numero_inicial,
      finalType: typeof form.numero_final,
      isValid,
    });
    return isValid;
  };

  const isFechaVencimientoValid = () => {
    if (!form.fecha_autorizacion || !form.fecha_vencimiento) return true;
    const fechaAuth = new Date(form.fecha_autorizacion);
    const fechaVenc = new Date(form.fecha_vencimiento);
    const isValid = fechaVenc > fechaAuth;
    console.log("isFechaVencimientoValid:", { fechaAuth, fechaVenc, isValid });
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpiar error cuando el usuario empiece a corregir
    if (error) {
      setError(null);
    }
  };

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    const tipoObj = TIPOS_ECF.find((t) => t.codigo === tipo);
    setForm((prev) => ({
      ...prev,
      tipo_comprobante: tipo,
      descripcion_tipo: tipoObj ? tipoObj.nombre : "",
    }));

    // Limpiar error cuando el usuario empiece a corregir
    if (error) {
      setError(null);
    }
  };

  // Función de validación
  const validateForm = () => {
    const errors = [];

    console.log("=== VALIDATING FORM ===");

    // Validar que numero_final > numero_inicial
    const numeroInicial = Number(form.numero_inicial);
    const numeroFinal = Number(form.numero_final);

    console.log(
      "Validation - numeroInicial:",
      numeroInicial,
      "numeroFinal:",
      numeroFinal
    );
    console.log("Is numeroFinal > numeroInicial?", numeroFinal > numeroInicial);
    console.log(
      "Are both numbers valid?",
      !isNaN(numeroInicial) && !isNaN(numeroFinal)
    );

    if (isNaN(numeroInicial) || isNaN(numeroFinal)) {
      errors.push("Los números inicial y final deben ser números válidos");
    } else if (numeroFinal <= numeroInicial) {
      errors.push("El número final debe ser mayor que el número inicial");
    }

    // Validar que fecha_vencimiento > fecha_autorizacion
    const fechaAutorizacion = new Date(form.fecha_autorizacion);
    const fechaVencimiento = new Date(form.fecha_vencimiento);

    console.log("Validation - fechaAutorizacion:", fechaAutorizacion);
    console.log("Validation - fechaVencimiento:", fechaVencimiento);
    console.log(
      "Is fechaVencimiento > fechaAutorizacion?",
      fechaVencimiento > fechaAutorizacion
    );
    console.log(
      "Are both dates valid?",
      !isNaN(fechaAutorizacion.getTime()) && !isNaN(fechaVencimiento.getTime())
    );

    if (
      isNaN(fechaAutorizacion.getTime()) ||
      isNaN(fechaVencimiento.getTime())
    ) {
      errors.push("Las fechas de autorización y vencimiento deben ser válidas");
    } else if (fechaVencimiento <= fechaAutorizacion) {
      errors.push(
        "La fecha de vencimiento debe ser posterior a la fecha de autorización"
      );
    }

    // Validar campos requeridos
    const requiredFields = [
      { field: "rnc", label: "RNC" },
      { field: "razon_social", label: "Razón social" },
      { field: "tipo_comprobante", label: "Tipo de comprobante" },
      { field: "numero_inicial", label: "Número inicial" },
      { field: "numero_final", label: "Número final" },
      { field: "fecha_autorizacion", label: "Fecha de autorización" },
      { field: "fecha_vencimiento", label: "Fecha de vencimiento" },
      { field: "alerta_minima_restante", label: "Alerta mínima restante" },
    ];

    requiredFields.forEach(({ field, label }) => {
      if (!form[field] || form[field] === "") {
        errors.push(`${label} es requerido`);
      }
    });

    console.log("Validation errors found:", errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== DEBUG EDITAR COMPROBANTE ===");
    console.log("Form data:", form);
    console.log(
      "Numero inicial:",
      form.numero_inicial,
      typeof form.numero_inicial
    );
    console.log("Numero final:", form.numero_final, typeof form.numero_final);
    console.log("Fecha autorización:", form.fecha_autorizacion);
    console.log("Fecha vencimiento:", form.fecha_vencimiento);

    // Validar formulario antes de enviar
    const validationErrors = validateForm();
    console.log("Validation errors:", validationErrors);

    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      console.log("Frontend validation failed, not sending to backend");
      return;
    }

    // Preparar datos para enviar (asegurar tipos correctos)
    const dataToSend = {
      ...form,
      numero_inicial: Number(form.numero_inicial),
      numero_final: Number(form.numero_final),
      alerta_minima_restante: Number(form.alerta_minima_restante),
    };

    console.log("Data to send:", dataToSend);
    console.log(
      "Numero inicial (parsed):",
      dataToSend.numero_inicial,
      typeof dataToSend.numero_inicial
    );
    console.log(
      "Numero final (parsed):",
      dataToSend.numero_final,
      typeof dataToSend.numero_final
    );
    console.log(
      "Is numero_final > numero_inicial?",
      dataToSend.numero_final > dataToSend.numero_inicial
    );
    console.log(
      "Fecha comparison:",
      new Date(dataToSend.fecha_vencimiento) >
        new Date(dataToSend.fecha_autorizacion)
    );

    const response = await updateComprobante(
      comprobante._id,
      dataToSend,
      token
    );
    console.log("Backend response:", response);

    if (response.status === "success") {
      setShowModal(false);
      setError(null);

      // Actualizar la lista de comprobantes
      if (refreshComprobantes) {
        refreshComprobantes();
      }
    } else {
      setError(response.message);
      // Hacer scroll al final del formulario después de mostrar el error
      setTimeout(() => {
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollTo({
            top: modalBodyRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  return (
    <div className={styles.editarComprobanteContainer}>
      {showModal && (
        <div className={styles.modalBg}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Editar numeración de e-CF</h3>
            </div>
            <div className={styles.modalBody} ref={modalBodyRef}>
              <form
                id="editarComprobanteForm"
                onSubmit={handleSubmit}
                className={styles.editarComprobanteForm}>
                <div className={styles.formGroup}>
                  <label>
                    RNC*
                    <input
                      name="rnc"
                      value={form.rnc}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Razón social*
                    <input
                      name="razon_social"
                      value={form.razon_social}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <hr className={styles.sectionDivider} />
                <label>
                  Tipo de comprobante*
                  <select
                    name="tipo_comprobante"
                    value={form.tipo_comprobante}
                    onChange={handleTipoChange}
                    required>
                    <option value="">Seleccione...</option>
                    {TIPOS_ECF.map((tipo) => (
                      <option key={tipo.codigo} value={tipo.codigo}>
                        {tipo.codigo} - {tipo.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Descripción
                  <input
                    name="descripcion_tipo"
                    value={form.descripcion_tipo}
                    disabled
                  />
                </label>
                <label>
                  Prefijo
                  <input name="prefijo" value={form.prefijo} disabled />
                </label>
                <hr className={styles.sectionDivider} />
                <div className={styles.formGroup}>
                  <label>
                    Número inicial*
                    <input
                      name="numero_inicial"
                      type="number"
                      value={form.numero_inicial}
                      onChange={handleChange}
                      min={0}
                      required
                    />
                  </label>
                  <label>
                    Número final*
                    <input
                      name="numero_final"
                      type="number"
                      value={form.numero_final}
                      onChange={handleChange}
                      min={0}
                      required
                      style={{
                        borderColor: !isNumeroFinalValid() ? "#ef4444" : "",
                        backgroundColor: !isNumeroFinalValid() ? "#fef2f2" : "",
                      }}
                    />
                    {!isNumeroFinalValid() && (
                      <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>
                        Debe ser mayor que el número inicial
                      </span>
                    )}
                  </label>
                  <label>
                    Cantidad*
                    <input
                      name="cantidad_numeros"
                      value={cantidadNumeros}
                      disabled
                    />
                  </label>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Fecha autorización*
                    <input
                      name="fecha_autorizacion"
                      type="date"
                      value={form.fecha_autorizacion}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Fecha vencimiento*
                    <input
                      name="fecha_vencimiento"
                      type="date"
                      value={form.fecha_vencimiento}
                      onChange={handleChange}
                      required
                      style={{
                        borderColor: !isFechaVencimientoValid()
                          ? "#ef4444"
                          : "",
                        backgroundColor: !isFechaVencimientoValid()
                          ? "#fef2f2"
                          : "",
                      }}
                    />
                    {!isFechaVencimientoValid() && (
                      <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>
                        Debe ser posterior a la fecha de autorización
                      </span>
                    )}
                  </label>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Alerta mínima restante*
                    <input
                      name="alerta_minima_restante"
                      type="number"
                      value={form.alerta_minima_restante}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Estado*
                    <select
                      name="estado"
                      value={form.estado}
                      onChange={handleChange}
                      required>
                      <option value="activo">Activo</option>
                      <option value="vencido">Vencido</option>
                      <option value="agotado">Agotado</option>
                    </select>
                  </label>
                </div>
                <label>
                  Comentario
                  <textarea
                    name="comentario"
                    value={form.comentario}
                    onChange={handleChange}
                  />
                </label>
                {error && (
                  <p ref={errorRef} className={styles.error}>
                    {error}
                  </p>
                )}

                {/* Panel de debug temporal */}
                <div
                  style={{
                    background: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}>
                  <strong>DEBUG INFO:</strong>
                  <div>
                    Número inicial: {form.numero_inicial} (tipo:{" "}
                    {typeof form.numero_inicial})
                  </div>
                  <div>
                    Número final: {form.numero_final} (tipo:{" "}
                    {typeof form.numero_final})
                  </div>
                  <div>Fecha auth: {form.fecha_autorizacion}</div>
                  <div>Fecha venc: {form.fecha_vencimiento}</div>
                  <div>
                    Número final válido: {isNumeroFinalValid() ? "SÍ" : "NO"}
                  </div>
                  <div>
                    Fecha venc válida: {isFechaVencimientoValid() ? "SÍ" : "NO"}
                  </div>
                  <div>Cantidad: {cantidadNumeros}</div>
                </div>
              </form>
            </div>
            <div className={styles.modalActions}>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" form="editarComprobanteForm">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

EditarComprobantes.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  token: PropTypes.string,
  refreshComprobantes: PropTypes.func,
  comprobante: PropTypes.object.isRequired,
};
