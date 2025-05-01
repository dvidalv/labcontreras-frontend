import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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

function PacientesSugerencias({ onSubmitSuccess }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
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
      clearErrors("root"); // Limpiar errores generales antes de enviar
      const response = await fetch(
        "https://labcontreras-backend.vercel.app/api/sugerencias/pacientes",
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
    </Form>
  );
}

export default PacientesSugerencias;
