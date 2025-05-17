import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../form.css";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../../utils/api";
import customToast, { Toaster } from "../../../components/CustomToast";

const schema = z.object({
  email: z.string().email("Por favor ingrese un correo electrónico válido"),
});

export default function ForgotPassword() {
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
      const response = await forgotPassword(data.email);
      if (response.status === "success") {
        customToast.success(response.message);
      } else if (response.status === "error") {
        customToast.error(response.message || "Error al procesar la solicitud");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      customToast.error(
        error.message ||
          "Error al conectar con el servidor. Por favor, intente más tarde."
      );
    }
  };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Recuperar Contraseña</h1>
      <p className="forgot-password-subtitle">
        Ingresa tu correo electrónico y te enviaremos las instrucciones para
        recuperar tu contraseña
      </p>

      <Form
        className="form forgot-password-form"
        onSubmit={handleSubmit(handleForm)}>
        <div className="form__field">
          <label className="form__label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="form__input"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="form__error">{errors.email.message}</p>
          )}
        </div>

        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          className={`form__button ${
            !isValid || isSubmitting ? "disabled" : ""
          }`}>
          {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
        </button>

        <div className="form__links">
          <Link to="/signin" className="form__link">
            Volver al inicio de sesión
          </Link>
        </div>
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
        }}
      />
    </div>
  );
}
