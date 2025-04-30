import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sugerenciasPacientes } from "../../../utils/api";

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

function PacientesSugerencias({ onSubmitSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(pacienteSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await sugerenciasPacientes(data);
      if (onSubmitSuccess) {
        onSubmitSuccess(res.mensaje);
      }
    } catch (error) {
      console.error("Error al enviar sugerencia:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
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
          <span className="error-message">{errors.satisfaccion.message}</span>
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
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar encuesta"}
      </button>
    </Form>
  );
}

export default PacientesSugerencias;
