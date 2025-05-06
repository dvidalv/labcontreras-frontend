import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { sugerenciasPacientes } from "../../../utils/api";
import { Toaster, toast } from "react-hot-toast";
import { getVisitorFingerprint } from "../../../utils/fingerprint";


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
      const fingerprint = await getVisitorFingerprint();
      if (!fingerprint) {
        throw new Error("No se pudo obtener la identificación del navegador");
      }

      const response = await sugerenciasPacientes({ ...data, fingerprint });
      console.log("Respuesta exitosa:", response);

      // Resetear el formulario y mostrar mensaje de éxito
      reset({
        nombre: "",
        satisfaccion: "",
        mejora: "",
      });

      toast.success("¡Sugerencia enviada con éxito!", toasterConfig.success);
    } catch (error) {
      console.error("Error completo:", error);

      // Asegurarnos de que estamos obteniendo el mensaje de error correctamente
      let errorMessage;

      try {
        // Si el error viene como respuesta del servidor
        if (error.response?.data) {
          errorMessage = error.response.data.message;
          console.log("Mensaje de error del servidor:", errorMessage);
        } else {
          // Si es un error de red u otro tipo
          errorMessage = error.message || "Error al enviar la sugerencia";
          console.log("Mensaje de error general:", errorMessage);
        }
      } catch (e) {
        errorMessage = "Error al enviar la sugerencia";
        console.error("Error al procesar el mensaje de error:", e);
      }

      setError("root", {
        type: "manual",
        message: errorMessage,
      });

      // Asegurarnos de que el mensaje no sea undefined o null
      if (!errorMessage) {
        errorMessage = "Error al enviar la sugerencia";
      }

      // Configurar el toast con el mensaje y las opciones
      const toastOptions = {
        ...toasterConfig.error,
        duration: 4000,
      };

      // Mostrar el mensaje de error
      toast.error(errorMessage, toastOptions);
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
