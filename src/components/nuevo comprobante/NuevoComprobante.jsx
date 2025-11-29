import styles from "./NuevoComprobante.module.css";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { TIPOS_ECF } from "../../utils/constants";
import { createComprobante } from "../../utils/api";

export default function NuevoComprobante({
  setShowModal,
  showModal,
  token,
  refreshComprobantes,
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
  const [showValidation, setShowValidation] = useState(false);

  // Referencias para hacer scroll
  const errorRef = useRef(null);
  const modalBodyRef = useRef(null);

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
    return new Date(form.fecha_vencimiento) > new Date(form.fecha_autorizacion);
  };

  // Función para determinar si mostrar error de fecha requerida
  const shouldShowFechaVencimientoRequiredError = () => {
    if (!showValidation) return false;
    const tiposQueNoRequierenVencimiento = ["32", "34"];
    return (
      !tiposQueNoRequierenVencimiento.includes(form.tipo_comprobante) &&
      (!form.fecha_vencimiento || form.fecha_vencimiento === "")
    );
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
    // Resetear validación al cambiar tipo
    setShowValidation(false);
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
    // (Validamos pero no mostramos mensaje aquí, se maneja visualmente en el campo)
    if (!tiposQueNoRequierenVencimiento.includes(form.tipo_comprobante)) {
      if (!form.fecha_vencimiento || form.fecha_vencimiento === "") {
        // Agregamos un error silencioso para prevenir el envío
        errors.push("FECHA_VENCIMIENTO_REQUERIDA");
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Activar la validación visual
    setShowValidation(true);

    // Validar formulario antes de enviar
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      // Filtrar errores silenciosos que se muestran visualmente en los campos
      const visibleErrors = validationErrors.filter(
        (error) => error !== "FECHA_VENCIMIENTO_REQUERIDA"
      );
      if (visibleErrors.length > 0) {
        setError(visibleErrors.join(". "));
      }
      return;
    }

    // Preparar datos para enviar (asegurar tipos correctos)
    const dataToSend = {
      ...form,
      numero_inicial: parseInt(form.numero_inicial),
      numero_final: parseInt(form.numero_final),
      alerta_minima_restante: parseInt(form.alerta_minima_restante),
    };

    const response = await createComprobante(dataToSend, token);
    if (response.status === "success") {
      setShowModal(false);
      setForm({
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
      setError(null); // Limpiar el error al éxito
      setShowValidation(false); // Resetear validación

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
    <div className={styles.nuevoComprobanteContainer}>
      <h2>Nuevo Comprobante</h2>

      {showModal && (
        <div className={styles.modalBg}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Crear numeración de e-CF</h3>
            </div>
            <div className={styles.modalBody} ref={modalBodyRef}>
              <form
                id="comprobanteForm"
                onSubmit={handleSubmit}
                className={styles.nuevoComprobanteForm}
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
                    Razón social
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
                    Fecha vencimiento
                    {!["32", "34"].includes(form.tipo_comprobante) ? "*" : ""}
                    <input
                      name="fecha_vencimiento"
                      type="date"
                      value={form.fecha_vencimiento}
                      onChange={handleChange}
                      key={`fecha_vencimiento_${form.tipo_comprobante}`}
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
                    {shouldShowFechaVencimientoRequiredError() && (
                      <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>
                        Fecha de vencimiento es requerida para este tipo de
                        comprobante
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
              <button type="submit" form="comprobanteForm">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.nuevoComprobanteContainerContent}>
        {/* Aquí podrías mostrar la lista de rangos creados, si lo deseas */}
      </div>
    </div>
  );
}

NuevoComprobante.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  token: PropTypes.string,
  refreshComprobantes: PropTypes.func,
};
