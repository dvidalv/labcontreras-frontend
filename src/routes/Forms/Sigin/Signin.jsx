import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../../contexts/MyContext";
import { authorize } from "../../../utils/auth";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import customToast, { Toaster } from "../../../components/CustomToast";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12),
});

function Signin() {
  const { hasAdmin } = useLoaderData();
  // console.log("hasAdmin:", hasAdmin);

  const { setToken } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const locationState = useLocation();
  const navigate = useNavigate();
  const { from } = locationState.state || { from: { pathname: "/" } };

  async function handleForm(data) {
    const { email, password } = data;
    try {
      const response = await authorize(email, password);
      if (!response.ok) {
        customToast.error("Password o Email incorrectos");
        return;
      }
      const res = await response.json();
      // console.log("res:", res);

      if (res.user.isDisabled) {
        customToast.error(
          "Tu cuenta está deshabilitada. Por favor, contacta al administrador."
        );
        return;
      }

      navigate(from.pathname, { replace: true }); // Redirecciona al usuario al estado anterior
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
      }
    } catch (err) {
      console.error(err);
      customToast.error("Ha ocurrido un error al intentar iniciar sesión.");
    }
  }

  return (
    <div className="form-container">
      {/* Notice for medical results */}
      <div className="form-container__notice">
        <p>
          ¿Buscas resultados de pacientes? Accede aquí:
          <Link
            to="https://contrerasrobledo.com/medico-signin"
            className="form-container__notice-link">
            Portal de Resultados
          </Link>
        </p>
      </div>

      <div className="form-container__content">
        <h1 className="form-container__title">Bienvenido</h1>
        {!hasAdmin && (
          <p className="form-container__subtitle">
            No tienes una cuenta? <Link to="/signup">Registrate</Link>
          </p>
        )}
        <p className="form-container__subtitle">
          ¿Olvidaste tu contraseña?{" "}
          <Link to="/forgot-password" className="form-container__subtitle-link">
            Recuperar contraseña
          </Link>
        </p>

        <Form className="form" onSubmit={handleSubmit(handleForm)}>
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Correo electrónico
            </label>
            <input
              {...register("email")}
              autoComplete="email"
              name="email"
              id="email"
              className="form__input"
              placeholder="ejemplo@correo.com"
            />
            {errors.email && (
              <p className="form__error">{errors.email.message}</p>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="password">
              Contraseña
            </label>
            <input
              {...register("password")}
              autoComplete="current-password"
              name="password"
              type="password"
              id="password"
              className="form__input"
              placeholder="••••••"
            />
            {errors.password && (
              <p className="form__error">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={!isValid || isSubmitting}
            type="submit"
            className={`form__button ${
              !isValid || isSubmitting ? "disabled" : ""
            }`}>
            {isSubmitting ? <span>Ingresando...</span> : <span>Ingresar</span>}
          </button>

          {errors.root && (
            <p className="form__error form__error--global">
              {errors.root.message}
            </p>
          )}
        </Form>
      </div>

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

export default Signin;
