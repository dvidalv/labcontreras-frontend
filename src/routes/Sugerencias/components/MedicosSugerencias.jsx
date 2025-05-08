import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
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
  discrepancias: z
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
function MedicosSugerencias() {
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
      discrepancias: "",
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
        discrepancias: "",
      });

      toast.success("¡Sugerencia enviada con éxito!", toasterConfig.success);
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
        <label>¿Qué tan satisfecho está con el servicio?</label>
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
        <label>
          ¿Ha tenido algún resultado que no coincida con los datos clínicos?
        </label>
        <textarea
          name="discrepancias"
          {...register("discrepancias")}
          placeholder="Describa la situación..."
          rows={6}
          className={errors.discrepancias ? "error" : ""}
        />
        {errors.discrepancias && (
          <span className="error-message">{errors.discrepancias.message}</span>
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
