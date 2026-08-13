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
    proximo_numero: "",
    fecha_autorizacion: "",
    fecha_vencimiento: "",
    alerta_minima_restante: "",
    estado: "activo",
    comentario: "",
  });
  const [error, setError] = useState(null);
  const [proximoNumeroMinimo, setProximoNumeroMinimo] = useState(null);

  // Referencias para hacer scroll
  const errorRef = useRef(null);
  const modalBodyRef = useRef(null);

  // Efecto para pre-llenar el formulario con los datos del comprobante
  useEffect(() => {
    if (comprobante) {
      // Formatear las fechas para el input type="date"
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const formatted = date.toISOString().split("T")[0];
        return formatted;
      };

      const numeroInicial = Number(comprobante.numero_inicial) || 0;
      const numerosUtilizados = Number(comprobante.numeros_utilizados) || 0;
      const proximoActual =
        comprobante.proximoNumero != null
          ? Number(comprobante.proximoNumero)
          : numeroInicial + numerosUtilizados;

      const formData = {
        rnc: comprobante.rnc || "",
        razon_social: comprobante.razon_social || "",
        tipo_comprobante: comprobante.tipo_comprobante || "",
        descripcion_tipo: comprobante.descripcion_tipo || "",
        prefijo: comprobante.prefijo || "E",
        numero_inicial: Number(comprobante.numero_inicial) || "",
        numero_final: Number(comprobante.numero_final) || "",
        proximo_numero: proximoActual || "",
        fecha_autorizacion: formatDate(comprobante.fecha_autorizacion),
        fecha_vencimiento: formatDate(comprobante.fecha_vencimiento),
        alerta_minima_restante:
          Number(comprobante.alerta_minima_restante) || "",
        estado: comprobante.estado || "activo",
        comentario: comprobante.comentario || "",
      };

      setProximoNumeroMinimo(proximoActual || null);
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

    return final > inicial;
  };

  const isFechaVencimientoValid = () => {
    // Si no hay fecha de vencimiento, siempre es válido para la comparación de fechas
    // (el campo requerido se maneja por separado)
    if (!form.fecha_vencimiento) return true;

    // Si no hay fecha de autorización, no podemos validar la comparación
    if (!form.fecha_autorizacion) return true;

    // Si ambas fechas existen, validar que vencimiento > autorización
    const fechaAuth = new Date(form.fecha_autorizacion);
    const fechaVenc = new Date(form.fecha_vencimiento);
    return fechaVenc > fechaAuth;
  };

  const isProximoNumeroValid = () => {
    if (
      form.proximo_numero === "" ||
      form.proximo_numero == null ||
      !form.numero_inicial ||
      !form.numero_final
    ) {
      return true;
    }

    const proximo = Number(form.proximo_numero);
    const inicial = Number(form.numero_inicial);
    const final = Number(form.numero_final);

    if (isNaN(proximo) || isNaN(inicial) || isNaN(final)) return false;
    if (proximo < inicial || proximo > final) return false;
    if (proximoNumeroMinimo != null && proximo < proximoNumeroMinimo) {
      return false;
    }

    return true;
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
    const tiposQueNoRequierenVencimiento = ["32", "34"];

    // Validar que numero_final > numero_inicial
    const numeroInicial = Number(form.numero_inicial);
    const numeroFinal = Number(form.numero_final);

    if (isNaN(numeroInicial) || isNaN(numeroFinal)) {
      errors.push("Los números inicial y final deben ser números válidos");
    } else if (numeroFinal <= numeroInicial) {
      errors.push("El número final debe ser mayor que el número inicial");
    }

    // Validar fechas solo si ambas están presentes
    const fechaAutorizacion = new Date(form.fecha_autorizacion);

    if (isNaN(fechaAutorizacion.getTime())) {
      errors.push("La fecha de autorización debe ser válida");
    }

    // Solo validar fecha de vencimiento si está presente o es requerida
    if (
      form.fecha_vencimiento ||
      !tiposQueNoRequierenVencimiento.includes(form.tipo_comprobante)
    ) {
      const fechaVencimiento = new Date(form.fecha_vencimiento);

      if (form.fecha_vencimiento && isNaN(fechaVencimiento.getTime())) {
        errors.push("La fecha de vencimiento debe ser válida");
      } else if (
        form.fecha_vencimiento &&
        !isNaN(fechaAutorizacion.getTime()) &&
        fechaVencimiento <= fechaAutorizacion
      ) {
        errors.push(
          "La fecha de vencimiento debe ser posterior a la fecha de autorización"
        );
      }
    }

    // Validar campos requeridos
    const requiredFields = [
      { field: "rnc", label: "RNC" },
      { field: "razon_social", label: "Razón social" },
      { field: "tipo_comprobante", label: "Tipo de comprobante" },
      { field: "numero_inicial", label: "Número inicial" },
      { field: "numero_final", label: "Número final" },
      { field: "fecha_autorizacion", label: "Fecha de autorización" },
      { field: "alerta_minima_restante", label: "Alerta mínima restante" },
    ];

    // Validar campos básicos requeridos
    requiredFields.forEach(({ field, label }) => {
      if (!form[field] || form[field] === "") {
        errors.push(`${label} es requerido`);
      }
    });

    // Validar fecha de vencimiento para todos los tipos EXCEPTO 32 y 34
    if (!tiposQueNoRequierenVencimiento.includes(form.tipo_comprobante)) {
      if (!form.fecha_vencimiento || form.fecha_vencimiento === "") {
        errors.push(
          "Fecha de vencimiento es requerida para este tipo de comprobante"
        );
      }
    }

    // Validar próximo número (solo avanzar dentro del rango)
    if (form.proximo_numero === "" || form.proximo_numero == null) {
      errors.push("Próximo número es requerido");
    } else {
      const proximo = Number(form.proximo_numero);
      if (isNaN(proximo)) {
        errors.push("El próximo número debe ser un número válido");
      } else if (
        !isNaN(numeroInicial) &&
        !isNaN(numeroFinal) &&
        (proximo < numeroInicial || proximo > numeroFinal)
      ) {
        errors.push(
          `El próximo número debe estar entre ${numeroInicial} y ${numeroFinal}`
        );
      } else if (
        proximoNumeroMinimo != null &&
        proximo < proximoNumeroMinimo
      ) {
        errors.push(
          `El próximo número no puede ser menor que el actual (${proximoNumeroMinimo}). Solo se puede avanzar.`
        );
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario antes de enviar
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      return;
    }

    const numeroInicial = Number(form.numero_inicial);
    const proximoNumero = Number(form.proximo_numero);
    const { proximo_numero: _proximoOmitido, ...formSinProximo } = form;

    // Preparar datos para enviar (asegurar tipos correctos)
    const dataToSend = {
      ...formSinProximo,
      numero_inicial: numeroInicial,
      numero_final: Number(form.numero_final),
      alerta_minima_restante: Number(form.alerta_minima_restante),
      numeros_utilizados: proximoNumero - numeroInicial,
    };

    const response = await updateComprobante(
      comprobante._id,
      dataToSend,
      token
    );

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
                className={styles.editarComprobanteForm}
                noValidate>
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
                <label>
                  Próximo número*
                  <input
                    name="proximo_numero"
                    type="number"
                    value={form.proximo_numero}
                    onChange={handleChange}
                    min={proximoNumeroMinimo ?? form.numero_inicial ?? 0}
                    max={form.numero_final || undefined}
                    required
                    style={{
                      borderColor: !isProximoNumeroValid() ? "#ef4444" : "",
                      backgroundColor: !isProximoNumeroValid()
                        ? "#fef2f2"
                        : "",
                    }}
                  />
                  {!isProximoNumeroValid() && (
                    <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>
                      Debe estar en el rango y no puede ser menor que el actual
                      {proximoNumeroMinimo != null
                        ? ` (${proximoNumeroMinimo})`
                        : ""}
                    </span>
                  )}
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      display: "block",
                      marginTop: "0.25rem",
                    }}>
                    Solo se puede avanzar (p. ej. para alinear con números ya
                    emitidos en The Factory). Esto reduce los disponibles.
                  </span>
                </label>
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
                    Fecha vencimiento
                    {!["32", "34"].includes(form.tipo_comprobante) ? "*" : ""}
                    <input
                      name="fecha_vencimiento"
                      type="date"
                      value={form.fecha_vencimiento}
                      onChange={handleChange}
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
                      <option value="inactivo">Inactivo</option>
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
