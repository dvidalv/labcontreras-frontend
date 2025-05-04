import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { sugerenciasPacientes } from "../../../utils/api";
import { Toaster, toast } from "react-hot-toast";

const pacienteSchema = z.object({
  nombre: z.string().optional(),
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
function PacientesSugerencias() {
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
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nombre: "",
      satisfaccion: "",
      mejora: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      clearErrors("root");

      // Log the data being sent
      // console.log("Enviando datos:", data);

      await sugerenciasPacientes(data);
      // console.log("Respuesta del servidor:", res);

      // Resetear el formulario y mostrar mensaje de éxito
      reset({
        nombre: "",
        satisfaccion: "",
        mejora: "",
      });

      toast.success("¡Sugerencia enviada con éxito!", toasterConfig.success);
    } catch (error) {
      console.error("Error detallado:", error);

      let errorMessage = "Error al enviar la sugerencia. ";

      if (error.message.includes("HTTP error!")) {
        errorMessage += "El servidor no pudo procesar la solicitud.";
      } else if (
        error.message.includes("La respuesta del servidor está vacía")
      ) {
        errorMessage += "No se recibió respuesta del servidor.";
      } else if (
        error.message.includes("La respuesta del servidor no es JSON válido")
      ) {
        errorMessage +=
          "La respuesta del servidor no tiene el formato esperado.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage +=
          "No se pudo conectar con el servidor. Verifique su conexión a internet.";
      } else {
        errorMessage += error.message || "Por favor, intente nuevamente.";
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
        <label>¿Nombre? (Opcional)</label>
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
          <option value="nada">Nada satisfecho</option>
          <option value="poco">Poco satisfecho</option>
          <option value="satisfecho">Satisfecho</option>
          <option value="muy">Muy satisfecho</option>
        </select>
        {errors.satisfaccion && (
          <span className="error-message">{errors.satisfaccion.message}</span>
        )}
      </div>
      <div className="form-group">
        <label>¿Qué podemos mejorar?</label>
        <textarea
          name="mejora"
          {...register("mejora")}
          placeholder="Escribe tu sugerencia aquí..."
          rows={6}
          className={errors.mejora ? "error" : ""}
        />
        {errors.mejora && (
          <span className="error-message">{errors.mejora.message}</span>
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

export default PacientesSugerencias;
