import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../form.css";
import { registerAction } from "../../../utils/auth";
import customToast, { Toaster } from "../../../components/CustomToast";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  name: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(6).max(12),
  role: z.string().min(1).max(10),
});

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForm = async (data) => {
    // console.log(data);
    try {
      const res = await registerAction(data);
      if (res.status === "success") {
        customToast.success(res.message);
        navigate("/signin");
      } else {
        customToast.error(res.message);
      }
    } catch (error) {
      if (error.toString().includes("409")) {
        setError("root", {
          message: "El correo ya existe",
        });
      } else {
        setError("root", {
          message: "Ha ocurrido un error",
        });
      }
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-container__title">Crear cuenta</h1>
      <Form className="form" onSubmit={handleSubmit(handleForm)}>
        <label className="form__label" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form__input"
          placeholder="Ingresa tu nombre"
          {...register("name")}
        />
        {errors.name && <p className="form__error">{errors.name?.message}</p>}

        <label className="form__label" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          required={true}
          className="form__input"
          placeholder="Ingresa tu correo electrónico"
          {...register("email")}
        />
        {errors.email && <p className="form__error">{errors.email?.message}</p>}

        <label className="form__label" htmlFor="password">
          Clave
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form__input"
          placeholder="Ingresa tu clave"
          {...register("password")}
        />
        <label className="form__label" htmlFor="role">
          Rol
        </label>
        <select
          id="role"
          name="role"
          className="form__input"
          {...register("role")}>
          <option value="user">Usuario</option>
          <option value="medico">Médico</option>
          <option value="admin">Administrador</option>
        </select>
        {errors.password && (
          <p className="form__error">{errors.password?.message}</p>
        )}

        <div className="form__links form__link_create-account">
          <Link to="/signin">Ya tienes cuenta?</Link>
        </div>

        <button
          className={`form__button ${
            !isValid || isSubmitting ? "disabled" : ""
          }`}
          type="submit">
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
        {errors.root && <p className="form__error">{errors.root.message}</p>}
      </Form>

      <Toaster
        position="top-center"
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

export default Signup;
