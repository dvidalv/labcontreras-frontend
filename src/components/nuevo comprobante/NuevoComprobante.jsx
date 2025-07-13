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
    form.numero_inicial === 0 ||
    form.numero_inicial === "" ||
    form.numero_final === 0 ||
    form.numero_final === ""
      ? ""
      : form.numero_final - form.numero_inicial + 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    const tipoObj = TIPOS_ECF.find((t) => t.codigo === tipo);
    setForm((prev) => ({
      ...prev,
      tipo_comprobante: tipo,
      descripcion_tipo: tipoObj ? tipoObj.nombre : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createComprobante(form, token);
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
                className={styles.nuevoComprobanteForm}>
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
                    />
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
                    />
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
