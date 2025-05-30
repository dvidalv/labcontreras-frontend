import { Form } from "react-router-dom";
import "./MedicosSignin.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import Tooltip from "../../../components/ToolTip/Tooltip";
import { useAppContext } from "../../../contexts/MyContext";
import { authorizeMedico } from "../../../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import powerByGiganet from "../../../images/powerbyGiganet.png";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
const schema = z.object({
  username: z.string(),
  password: z.string().min(6).max(12),
});

function Signin() {
  //hook form
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
  const { from } = locationState.state || { from: { pathname: "/" } }; // Si no hay estado, redirecciona al inicio
  const { setFileMakerToken, setMedicoUser } = useAppContext();
  // console.log(fileMakerToken);

  async function handleForm(data) {
    const { username, password } = data;
    try {
      const response = await authorizeMedico(username, password);

      // Check if response status is 503
      if (response.status === 503) {
        toast.error(
          "FM servidor no está disponible en este momento. Por favor, intente más tarde.",
          {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#FF4B4B",
              color: "#fff",
            },
          }
        );
        return;
      }

      const res = await response.json();

      // Manejar credenciales inválidas
      if (res.code === "401" || res.messages?.[0]?.code === "401") {
        toast.error("Usuario o contraseña incorrectos", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      // Si no hay datos en la respuesta
      if (!res.response?.data?.[0]) {
        toast.error("Error al obtener datos del usuario", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      const dataMedico = res.response.data[0].fieldData;
      const { nombre, apellido, email, ID, foto, usuario, centroExterno } =
        dataMedico;
      localStorage.setItem(
        "medicoUser",
        JSON.stringify({
          nombre,
          apellido,
          email,
          ID,
          foto,
          usuario,
          centroExterno,
        })
      );
      setMedicoUser((prev) => ({
        ...prev,
        nombre,
        apellido,
        email,
        ID,
        foto,
        usuario,
        centroExterno,
      }));

      if (!res.token) {
        toast.error("Error al obtener el token de autenticación", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      localStorage.setItem("fileMakerToken", res.token);
      localStorage.setItem("tokenTimestamp", new Date().getTime());
      setFileMakerToken(() => res.token);
      toast.success("¡Inicio de sesión exitoso!", {
        duration: 3000,
        position: "top-center",
      });
      navigate(from.pathname, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Ha ocurrido un error al intentar iniciar sesión", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  return (
    <>
      <Toaster />
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.5,
        }}>
        <Form
          className="form medicos-signin"
          onSubmit={handleSubmit(handleForm)}>
          <motion.h1
            className="form-container__title"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 1.3,
            }}>
            INGRESAR
          </motion.h1>
          <label
            htmlFor="email"
            style={{
              color: "grey",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: ".3rem",
              display: "block",
            }}>
            Usuario
          </label>
          <input
            {...register("username")}
            autoComplete="off"
            name="username"
            id="username"
            className="form__input"
            placeholder="Ingresa tu nombre de usuario"
          />
          <p className="form__error">{errors.username?.message}</p>

          <label
            htmlFor="password"
            style={{
              color: "grey",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: ".3rem",
              display: "block",
            }}>
            Contraseña
          </label>
          <input
            {...register("password")}
            autoComplete="off"
            name="password"
            type="password"
            id="password"
            className="form__input"
            placeholder="Ingresa tu clave"
          />
          <p className="form__error">{errors.password?.message}</p>
          <div className="form__link form__link_create-account">
            {/* <Link
						to="/forgot-password"
						className="form__link form-link--forgot-password"
					>
						¿Olvidaste tu contraseña?
					</Link> */}
            {/* <Link to="/signup" >
						Crear cuenta
					</Link> */}
          </div>

          <button
            disabled={!isValid || isSubmitting}
            type="submit"
            className={`form__button ${
              !isValid || isSubmitting ? "disabled" : ""
            }`}>
            {isSubmitting ? "Enviando..." : "Ingresar"}
          </button>
          <p className="form__error">{errors.root && errors.root.message}</p>
        </Form>
        {/* {showTooltip && (
          <Tooltip
            message={message}
            type={type}
            location={location}
            className="tooltip--visible"
          />
        )} */}
        <motion.div
          className="form-container__power-by-giganet"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 1.5,
          }}>
          <a
            href="https://www.giganet-srl.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            title="Contacta a Giganet">
            <img
              src={powerByGiganet}
              alt="power by giganet"
              className="form-container__power-by-giganet-img"
            />
          </a>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Signin;
