import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Sugerencias.css";
import { sugerencias } from "../../utils/api";
import background1 from "../../images/background-1.jpg";
import background2 from "../../images/background-2.jpg";
import background3 from "../../images/background-3.jpg";
import background4 from "../../images/background-4.jpg";
import background5 from "../../images/background-5.jpg";

import "animate.css";

function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}
const number = getRandomNumber();

const pacienteSchema = z.object({
  satisfaccion: z.string({
    required_error: "Debe seleccionar un nivel de satisfacción",
  }),
  mejora: z
    .string({
      required_error: "Este campo es requerido",
    })
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede exceder los 500 caracteres")
    .trim(),
});

const medicoSchema = z.object({
  satisfaccion: z.string({
    required_error: "Debe seleccionar un nivel de satisfacción",
  }),
  discrepancias: z
    .string({
      required_error: "Este campo es requerido",
    })
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede exceder los 500 caracteres")
    .trim(),
});

const empresaSchema = z.object({
  satisfaccion: z.string({
    required_error: "Debe seleccionar un nivel de satisfacción",
  }),
  oportuno: z.string({
    required_error: "Debe seleccionar si los resultados han sido oportunos",
  }),
});

function Sugerencias() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState("");
  const [area, setArea] = useState("pacientes");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      area === "pacientes"
        ? pacienteSchema
        : area === "medicos"
        ? medicoSchema
        : empresaSchema
    ),
  });

  const timeoutRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const res = await sugerencias({ ...data, area });
      const { mensaje } = res;
      setMessage(mensaje);
      setShowBanner(true);

      timeoutRef.current = setTimeout(() => {
        setShowBanner(false);
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Error al enviar sugerencia:", error);
    }
  };

  let style = {
    backgroundImage: `url(${
      number === 1
        ? background1
        : number === 2
        ? background2
        : number === 3
        ? background3
        : number === 4
        ? background4
        : background5
    })`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
  };

  const renderForm = () => {
    switch (area) {
      case "pacientes":
        return (
          <>
            <div className="form-group">
              <label>¿Nombre?</label>
              <input
                {...register("nombre")}
                className={errors.nombre ? "error" : ""}
              />
              {errors.nombre && (
                <span className="error-message">{errors.nombre.message}</span>
              )}
            </div>
            <div className="form-group">
              {errors.satisfaccion && (
                <span className="error-message">
                  {errors.satisfaccion.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>¿Qué tan satisfecho está con el servicio ofrecido?</label>
              <select
                {...register("satisfaccion")}
                className={errors.satisfaccion ? "error" : ""}>
                <option value="">Seleccione una opción</option>
                <option value="nada">Nada satisfecho</option>
                <option value="poco">Poco satisfecho</option>
                <option value="satisfecho">Satisfecho</option>
                <option value="muy">Muy satisfecho</option>
              </select>
              {errors.satisfaccion && (
                <span className="error-message">
                  {errors.satisfaccion.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>¿Qué podemos mejorar?</label>
              <textarea
                {...register("mejora")}
                placeholder="Escribe tu sugerencia aquí..."
                rows={6}
                className={errors.mejora ? "error" : ""}
              />
              {errors.mejora && (
                <span className="error-message">{errors.mejora.message}</span>
              )}
            </div>
          </>
        );
      case "medicos":
        return (
          <>
            <div className="form-group">
              <label>¿Nombre?</label>
              <input
                {...register("nombre")}
                className={errors.nombre ? "error" : ""}
              />
              {errors.nombre && (
                <span className="error-message">{errors.nombre.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>¿Qué tan satisfecho está con el servicio?</label>
              <select
                {...register("satisfaccion")}
                className={errors.satisfaccion ? "error" : ""}>
                <option value="">Seleccione una opción</option>
                <option value="nada">Nada satisfecho</option>
                <option value="poco">Poco satisfecho</option>
                <option value="satisfecho">Satisfecho</option>
                <option value="muy">Muy satisfecho</option>
              </select>
              {errors.satisfaccion && (
                <span className="error-message">
                  {errors.satisfaccion.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>
                ¿Ha tenido algún resultado que no coincida con los datos
                clínicos?
              </label>
              <textarea
                {...register("discrepancias")}
                placeholder="Describa la situación..."
                rows={6}
                className={errors.discrepancias ? "error" : ""}
              />
              {errors.discrepancias && (
                <span className="error-message">
                  {errors.discrepancias.message}
                </span>
              )}
            </div>
          </>
        );
      case "empresas":
        return (
          <>
            <div className="form-group">
              <label>¿Empresa?</label>
              <input
                {...register("empresa")}
                className={errors.empresa ? "error" : ""}
              />
              {errors.nombre && (
                <span className="error-message">{errors.nombre.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>¿Qué tan satisfecho está con el servicio ofrecido?</label>
              <select
                {...register("satisfaccion")}
                className={errors.satisfaccion ? "error" : ""}>
                <option value="">Seleccione una opción</option>
                <option value="nada">Nada satisfecho</option>
                <option value="poco">Poco satisfecho</option>
                <option value="satisfecho">Satisfecho</option>
                <option value="muy">Muy satisfecho</option>
              </select>
              {errors.satisfaccion && (
                <span className="error-message">
                  {errors.satisfaccion.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>¿Sus resultados han llegado oportunamente?</label>
              <select
                {...register("oportuno")}
                className={errors.oportuno ? "error" : ""}>
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {errors.oportuno && (
                <span className="error-message">{errors.oportuno.message}</span>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sugerencias-container" style={style}>
      {showBanner && (
        <div className="success-banner">
          <p style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
            {message}
          </p>
        </div>
      )}
      <h2 className="animate__animated animate__backInDown">
        Encuesta de Satisfacción
      </h2>
      <div className="area-selector">
        <button
          className={`area-button ${area === "pacientes" ? "active" : ""}`}
          onClick={() => setArea("pacientes")}>
          Pacientes
        </button>
        <button
          className={`area-button ${area === "medicos" ? "active" : ""}`}
          onClick={() => setArea("medicos")}>
          Médicos
        </button>
        <button
          className={`area-button ${area === "empresas" ? "active" : ""}`}
          onClick={() => setArea("empresas")}>
          Empresas
        </button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        {renderForm()}
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar encuesta"}
        </button>
      </Form>
    </div>
  );
}

export default Sugerencias;
