import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../../contexts/MyContext";
import { updateUser } from "../../../utils/api";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./UserDashBoard.css";

const schema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  role: z.string().min(3).max(10),
});

const roles = ["user", "medico", "admin", "guest"];

function EditUser() {
  const { token } = useAppContext();
  const navigate = useNavigate();
  const { user: userData } = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: userData.user.name || "",
      email: userData.user.email || "",
      role: userData.user.role || "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", {
        ...data,
        _id: userData.user._id,
        url: userData.user.url,
      });

      const response = await updateUser({
        data: { ...data, _id: userData.user._id, url: userData.user.url },
        token,
      });

      console.log("Server response:", response);

      if (response.status === "error") {
        throw new Error(response.message || "Error al actualizar usuario");
      }

      if (response.user || response.status === "success") {
        await Swal.fire({
          icon: "success",
          title: "Usuario actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/user-dashboard");
      } else {
        throw new Error("Respuesta del servidor no válida");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar usuario",
        text: error.message || "Por favor intente nuevamente",
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="user_dashboard">
        <div className="section user_dashboard-container">
          <h2>Editar Usuario</h2>
          <div className="preview_user">
            <div className="preview_user-avatar">
              <img src={userData.user.url} alt="avatar" />
            </div>
          </div>
          <form
            className="user_dashboard-form"
            onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Nombre" {...register("name")} />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <select {...register("role")}>
              <option value="" disabled>
                Selecciona un rol
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && <p className="error">{errors.role.message}</p>}
          
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button">
              {isSubmitting ? "Actualizando..." : "Actualizar Usuario"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
