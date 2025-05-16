import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Tooltip from "../../../components/ToolTip/Tooltip";
import { useAppContext } from "../../../contexts/MyContext";
import { authorize } from "../../../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12),
});

function Signin() {
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
  const {
    showTooltip,
    setShowTooltip,
    message,
    setMessage,
    type,
    setType,
    setToken,
    location,
    setLocation,
  } = useAppContext();

  async function handleForm(data) {
    const { email, password } = data;
    try {
      const response = await authorize(email, password);
      if (!response.ok) {
        setShowTooltip(true);
        setType("error");
        setMessage("Password o Email incorrectos");
        setLocation("signin");
        return;
      }
      const res = await response.json();
      navigate(from.pathname, { replace: true }); // Redirecciona al usuario al estado anterior
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
      }
    } catch (err) {
      console.error(err);
      setType("error");
      setMessage("Ha ocurrido un error al intentar iniciar sesión.");
      setShowTooltip(true);
    }
  }

  return (
    <div className="form-container">
      {/* Notice for medical results */}
      <div className="form-container__notice">
        <p>
          ¿Buscas resultados de pacientes? Accede aquí:
          <a
            href="https://contrerasrobledo.com/medico-signin"
            className="form-container__notice-link">
            Portal de Resultados
          </a>
        </p>
      </div>

      <div className="form-container__content">
        <h1 className="form-container__title">Bienvenido</h1>
        <p className="form-container__subtitle">
          No tienes una cuenta? <a href="/signup">Registrate</a>
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

      {showTooltip && (
        <Tooltip
          message={message}
          type={type}
          location={location}
          className="tooltip--visible"
        />
      )}
    </div>
  );
}

export default Signin;
