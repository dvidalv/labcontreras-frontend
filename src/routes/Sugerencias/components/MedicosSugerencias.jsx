import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { sugerenciasMedicos } from "../../../utils/api";
import { Toaster, toast } from "react-hot-toast";
import { getVisitorFingerprint } from "../../../utils/fingerprint";

const medicoSchema = z.object({
  nombre: z.string().optional(),
  satisfaccion: z.string({
    required_error: "Debe seleccionar un nivel de satisfacción",
  }),
  entregaOportuna: z.string({
    required_error: "Debe seleccionar una opción",
  }),
  informesClaros: z.string({
    required_error: "Debe seleccionar una opción",
  }),
  utilidadDiagnosticos: z.string({
    required_error: "Debe seleccionar una opción",
  }),
  metodosTecnicos: z.string({
    required_error: "Debe seleccionar una opción",
  }),
  sugerencias: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede exceder los 500 caracteres")
    .trim(),
});

const toasterConfig = {
  style: {
    padding: "16px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    maxWidth: "500px",
    fontWeight: "500",
  },
  success: {
    style: {
      background: "#10B981",
      color: "white",
    },
    duration: 3000,
  },
  error: {
    style: {
      background: "#EF4444",
      color: "white",
    },
    duration: 4000,
  },
};

// eslint-disable-next-line react/prop-types
function MedicosSugerencias() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(medicoSchema),
    defaultValues: {
      nombre: "",
      satisfaccion: "",
      entregaOportuna: "",
      informesClaros: "",
      utilidadDiagnosticos: "",
      metodosTecnicos: "",
      sugerencias: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      clearErrors("root");
      const fingerprint = await getVisitorFingerprint();
      if (!fingerprint) {
        throw new Error("No se pudo obtener la identificación del navegador");
      }

      await sugerenciasMedicos({ ...data, fingerprint });

      // Resetear el formulario y mostrar mensaje de éxito
      reset({
        nombre: "",
        satisfaccion: "",
        entregaOportuna: "",
        informesClaros: "",
        utilidadDiagnosticos: "",
        metodosTecnicos: "",
        sugerencias: "",
      });

      toast.success("¡Sugerencia enviada con éxito!", toasterConfig.success);

      // Redirigir al usuario a la página principal después de 3 segundos
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error detallado:", error);

      let errorMessage;

      // Manejar errores de la API
      if (error.response?.data?.error === "RATE_LIMIT_EXCEEDED") {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "No se pudo conectar con el servidor. Verifique su conexión a internet.";
      } else {
        errorMessage =
          "Error al enviar la sugerencia. Por favor, intente nuevamente.";
      }

      setError("root", {
        type: "manual",
        message: errorMessage,
      });

      toast.error(errorMessage, toasterConfig.error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label>Nombre (Opcional)</label>
        <input
          name="nombre"
          {...register("nombre")}
          className={errors.nombre ? "error" : ""}
          placeholder="Ingrese su nombre (opcional)"
        />
        {errors.nombre && (
          <span className="error-message">{errors.nombre.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>¿Qué tan satisfecho está con el servicio ofrecido?</label>
        <select
          name="satisfaccion"
          {...register("satisfaccion")}
          className={errors.satisfaccion ? "error" : ""}>
          <option value="">Seleccione una opción</option>
          <option value="muy-satisfecho">Muy satisfecho</option>
          <option value="satisfecho">Satisfecho</option>
          <option value="poco-satisfecho">Poco satisfecho</option>
          <option value="nada-satisfecho">Nada satisfecho</option>
        </select>
        {errors.satisfaccion && (
          <span className="error-message">{errors.satisfaccion.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>¿Los resultados han sido entregados en tiempo oportuno?</label>
        <select
          name="entregaOportuna"
          {...register("entregaOportuna")}
          className={errors.entregaOportuna ? "error" : ""}>
          <option value="">Seleccione una opción</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        {errors.entregaOportuna && (
          <span className="error-message">
            {errors.entregaOportuna.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>¿Los informes emitidos son claros y precisos?</label>
        <select
          name="informesClaros"
          {...register("informesClaros")}
          className={errors.informesClaros ? "error" : ""}>
          <option value="">Seleccione una opción</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        {errors.informesClaros && (
          <span className="error-message">{errors.informesClaros.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Los diagnósticos fueron generalmente:</label>
        <select
          name="utilidadDiagnosticos"
          {...register("utilidadDiagnosticos")}
          className={errors.utilidadDiagnosticos ? "error" : ""}>
          <option value="">Seleccione una opción</option>
          <option value="utiles">Útiles para el manejo de los pacientes</option>
          <option value="no-concluyentes">
            No concluyentes para el manejo de los pacientes
          </option>
          <option value="sin-beneficio">
            No aportaron beneficio para el manejo de los pacientes
          </option>
        </select>
        {errors.utilidadDiagnosticos && (
          <span className="error-message">
            {errors.utilidadDiagnosticos.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Los métodos técnicos aplicados fueron:</label>
        <select
          name="metodosTecnicos"
          {...register("metodosTecnicos")}
          className={errors.metodosTecnicos ? "error" : ""}>
          <option value="">Seleccione una opción</option>
          <option value="modernos">Modernos y actualizados</option>
          <option value="excesivos">Exagerados y excesivos</option>
          <option value="obsoletos">Obsoletos</option>
        </select>
        {errors.metodosTecnicos && (
          <span className="error-message">
            {errors.metodosTecnicos.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>
          ¿Cuáles son los puntos de mejora que usted sugiere para ofrecer un
          mejor diagnóstico y/o servicio?
        </label>
        <textarea
          name="sugerencias"
          {...register("sugerencias")}
          placeholder="Describa sus sugerencias..."
          rows={6}
          className={errors.sugerencias ? "error" : ""}
        />
        {errors.sugerencias && (
          <span className="error-message">{errors.sugerencias.message}</span>
        )}
      </div>

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar encuesta"}
      </button>
      {errors.root && (
        <div className="general-error-message">{errors.root.message}</div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          ...toasterConfig.style,
          success: toasterConfig.success,
          error: toasterConfig.error,
        }}
      />
    </Form>
  );
}

export default MedicosSugerencias;
