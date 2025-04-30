import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

function EmpresasSugerencias({ onSubmitSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
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
      clearErrors("root"); // Limpiar errores generales antes de enviar
      const response = await fetch(
        "https://labcontreras-backend.vercel.app/api/sugerencias/empresas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      if (!response.ok) {
        setError("root", {
          type: "manual",
          message:
            res.message ||
            "Error al enviar la sugerencia. Por favor, intente nuevamente.",
        });
        return;
      }

      if (onSubmitSuccess && res.mensaje) {
        onSubmitSuccess(res.mensaje);
      }
    } catch (error) {
      console.error("Error al enviar sugerencia:", error);
      setError("root", {
        type: "manual",
        message:
          "Error de conexión. Por favor, verifique su conexión a internet e intente nuevamente.",
      });
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
    </Form>
  );
}

export default EmpresasSugerencias;
