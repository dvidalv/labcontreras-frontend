import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../../contexts/MyContext";
import { updateUser } from "../../../utils/api";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./UserDashBoard.css";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import { uploadAvatar } from "../../../utils/api";
const schema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  role: z.string().min(3).max(10),
});

const roles = ["user", "medico", "admin", "guest"];

function EditUser() {
  const { token } = useAppContext();
  const navigate = useNavigate();
  const { user: loadedUserData } = useLoaderData();
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(loadedUserData.user.url);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: loadedUserData.user.name || "",
      email: loadedUserData.user.email || "",
      role: loadedUserData.user.role || "",
    },
    resolver: zodResolver(schema),
  });

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        _id: loadedUserData.user._id,
        url: newImage || loadedUserData.user.url,
      };

      const response = await updateUser({ data: userData, token });

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      console.log("image:", file);

      const formData = new FormData();
      formData.append("image", file);

      //subimos la imagen
      try {
        const response = await uploadAvatar(formData);
        if (response.url) {
          setNewImage(response.url);
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        Swal.fire({
          icon: "error",
          title: "Error al subir la imagen",
          text: "Por favor intente nuevamente",
        });
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="user_dashboard">
        <div className="section user_dashboard-container">
          <div className="edit-header">
            <button onClick={handleBack} className="back-button">
              <IoArrowBack /> Regresar
            </button>
            <h2>Editar Usuario</h2>
          </div>
          <div className="preview_user">
            <div className="preview_user-avatar">
              <img src={loadedUserData.user.url} alt="avatar actual" />
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

            <div className="preview_user">
              <div className="preview_user-avatar">
                <img src={previewUrl} alt="nueva imagen" />
              </div>
              <input
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                className="image-input"
              />
            </div>

            <div className="form-buttons">
              <button
                type="button"
                onClick={handleBack}
                className="cancel-button">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button">
                {isSubmitting ? "Actualizando..." : "Actualizar Usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
