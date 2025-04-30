import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sugerenciasEmpresas } from "../../../utils/api";

const empresaSchema = z.object({
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
  } = useForm({
    resolver: zodResolver(empresaSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await sugerenciasEmpresas(data);
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
        <label>¿Empresa?</label>
        <input
          {...register("empresa")}
          className={errors.empresa ? "error" : ""}
        />
        {errors.empresa && (
          <span className="error-message">{errors.empresa.message}</span>
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
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar encuesta"}
      </button>
    </Form>
  );
}

export default EmpresasSugerencias;
