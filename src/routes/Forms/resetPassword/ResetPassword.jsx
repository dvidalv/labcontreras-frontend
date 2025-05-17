import { Form, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../form.css";
import "./ResetPassword.css";
import { resetPassword } from "../../../utils/api";
import customToast, { Toaster } from "../../../components/CustomToast";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(50, "La contraseña no puede tener más de 50 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleForm = async (data) => {
    try {
      const response = await resetPassword(token, data.password);
      if (response.status === "success") {
        customToast.success(response.message);
      } else if (response.status === "error") {
        customToast.error(response.message || "Error al procesar la solicitud");
      }
      // Redirigir al login después de unos segundos
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      customToast.error(
        "Error al actualizar la contraseña. Por favor, intenta nuevamente"
      );
    }
  };

  return (
    <div className="reset-password-container">
      <h1 className="reset-password-title">Cambiar Contraseña</h1>
      <p className="reset-password-subtitle">Ingresa tu nueva contraseña</p>

      <Form
        className="form reset-password-form"
        onSubmit={handleSubmit(handleForm)}>
        <div className="form__field">
          <label className="form__label" htmlFor="password">
            Nueva contraseña
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form__input"
            placeholder="••••••"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="form__error">{errors.password.message}</p>
          )}
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            className="form__input"
            placeholder="••••••"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="form__error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          className={`form__button ${
            !isValid || isSubmitting ? "disabled" : ""
          }`}>
          {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
        </button>
      </Form>

      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{
          top: 120,
        }}
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
              fontSize: "16px",
              padding: "16px 24px",
              maxWidth: "500px",
              width: "fit-content",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
              fontSize: "16px",
              padding: "16px 24px",
              maxWidth: "500px",
              width: "fit-content",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      />
    </div>
  );
}
