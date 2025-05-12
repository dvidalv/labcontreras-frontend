import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { sugerenciasEmpresas } from "../../../utils/api";
import { Toaster, toast } from "react-hot-toast";
import { getVisitorFingerprint } from "../../../utils/fingerprint";

const empresaSchema = z.object({
  empresa: z
    .string({
      required_error: "El nombre de la empresa es requerido",
    })
    .min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  satisfaccion: z.string({
    required_error: "Debe seleccionar un nivel de satisfacción",
  }),
  oportuno: z.string({
    required_error: "Debe seleccionar si los resultados han sido oportunos",
  }),
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
function EmpresasSugerencias() {
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
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      empresa: "",
      satisfaccion: "",
      oportuno: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      clearErrors("root");
      const fingerprint = await getVisitorFingerprint();
      if (!fingerprint) {
        throw new Error("No se pudo obtener la identificación del navegador");
      }

      await sugerenciasEmpresas({ ...data, fingerprint });

      // Resetear el formulario y mostrar mensaje de éxito
      reset({
        empresa: "",
        satisfaccion: "",
        oportuno: "",
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
        <label>Nombre de la Empresa</label>
        <input
          name="empresa"
          {...register("empresa")}
          className={errors.empresa ? "error" : ""}
          placeholder="Ingrese el nombre de la empresa"
        />
        {errors.empresa && (
          <span className="error-message">{errors.empresa.message}</span>
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
        <label>¿Sus resultados han llegado oportunamente?</label>
        <select
          name="oportuno"
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

export default EmpresasSugerencias;
