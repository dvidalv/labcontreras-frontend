import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../../contexts/MyContext";
import "./UserDashBoard.css";
import avatar from "../../../images/avatar.svg";
import {
  uploadAvatar,
  createUser,
  deleteImage,
  deleteUser,
  getUsers,
} from "../../../utils/api";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["user", "medico", "admin", "guest"];

const schemaNewUser = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  role: z.string().min(3).max(10),
  image: z.instanceof(File),
  password: z.string().min(4).max(30),
});

function UserDashBoard() {
  const navigate = useNavigate();
  const { setAvatarUrl, token } = useAppContext();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { users: usersData } = useLoaderData();
  const hasAdminUser = usersData.some((user) => user.role === "admin");

  const availableRoles = hasAdminUser
    ? roles.filter((role) => role !== "admin")
    : roles;

  useEffect(() => {
    const filterUsers = usersData.filter((user) => user.role !== "admin");
    if (filterUsers.length > 0) {
      setUsers(filterUsers);
    }
  }, [usersData]);

  useEffect(() => {
    setAvatarUrl("");
  }, [setAvatarUrl]);

  const {
    reset: resetNewUser,
    register: registerNewUser,
    handleSubmit: handleSubmitNewUser,
    setValue: setValueNewUser,
    formState: { isSubmitting: isSubmittingNewUser },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      image: "",
      password: "",
    },
    resolver: zodResolver(schemaNewUser),
    mode: "onChange",
  });

  // para agregar un nuevo usuario
  async function handleNewUser(data) {
    const file = data.image;

    try {
      // Crear FormData y agregar el archivo
      const formData = new FormData();
      formData.append("image", file);

      // Subir la imagen primero
      const uploadResponse = await uploadAvatar(formData);

      if (!uploadResponse.url) {
        throw new Error("No se recibió la URL de la imagen");
      }

      // Crear el objeto de usuario con todos los datos y la URL de la imagen
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        url: uploadResponse.url,
      };

      // Aquí puedes agregar la llamada a la API para crear el usuario
      const createUserResponse = await createUser(userData);
      console.log("Respuesta de la API:", createUserResponse);
      if (createUserResponse.user) {
        await Swal.fire({
          icon: "success",
          title: "Usuario creado",
          showConfirmButton: false,
          timer: 1500,
        });

        // Actualizar la lista de usuarios
        const updatedUsersResponse = await getUsers();
        const filteredUsers = updatedUsersResponse.users.filter(
          (user) => user.role !== "admin"
        );
        setUsers(filteredUsers);

        // Cerrar el modal y resetear el formulario
        setModalIsOpen(false);
        setPreviewImage(null);
        resetNewUser({
          name: "",
          email: "",
          role: "",
          image: "",
          password: "",
        });
      }

      if (createUserResponse.status === "error") {
        Swal.fire({
          icon: "error",
          title: "Error al crear el usuario",
          text: createUserResponse.message,
        });
        //con la url de la imagen, la removemos de cloudinary
        const deleteImageResponse = await deleteImage(uploadResponse.url);
        console.log("Respuesta de la API:", deleteImageResponse);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir la imagen",
        text: "Por favor, intenta de nuevo",
      });
    }
  }

  const handleEditUser = (userId) => {
    navigate(`/user-dashboard/${userId}/edit`);
  };

  function handleOpenPopup() {
    fileInputRef.current.click();
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValueNewUser("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setPreviewImage(null);
    resetNewUser({
      name: "",
      email: "",
      role: "",
      image: "",
      password: "",
    });
  };

  const handleDeleteUser = async (userId, userName, userImageUrl) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        html: `
          <div class="delete-confirmation">
            <p>¿Deseas eliminar al usuario <strong>${userName}</strong>?</p>
            <p class="warning-text">Esta acción no se puede deshacer.</p>
          </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "delete-popup",
          title: "delete-title",
          htmlContainer: "delete-content",
          confirmButton: "delete-confirm-button",
          cancelButton: "delete-cancel-button",
        },
      });

      if (result.isConfirmed) {
        // 1. Elimina la imagen de Cloudinary
        if (userImageUrl) {
          await deleteImage(userImageUrl);
        }

        // 2. Elimina el usuario de la base de datos
        const response = await deleteUser({ userId, token });

        if (response.status === "error") {
          throw new Error(response.message);
        }

        // Remove the user from the local state
        setUsers(users.filter((user) => user._id !== userId));

        await Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo eliminar el usuario",
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="user_dashboard">
        <div className="section user_dashboard-container">
          <div className="user_dashboard-container-header">
            <RiAddLine
              className="user_dashboard-container-header-icon"
              onClick={handleOpenModal}
            />
            <h2>Agregar Usuario</h2>
          </div>
          <div className="grid-container">
            {/* Headers */}
            <div className="grid-header grid-header-name">Nombre</div>
            <div className="grid-header grid-header-email">Email</div>
            <div className="grid-header grid-header-role">Rol</div>
            <div className="grid-header grid-header-avatar">Avatar</div>
            <div className="grid-header grid-header-actions">Acciones</div>

            {/* Body */}
            <div className="grid-body">
              {users.map((user) => (
                <div className="grid-row" key={user._id}>
                  <div className="grid-cell grid-cell-name" data-label="Nombre">
                    {user.name}
                  </div>
                  <div className="grid-cell grid-cell-email" data-label="Email">
                    {user.email}
                  </div>
                  <div className="grid-cell grid-cell-role" data-label="Rol">
                    {user.role}
                  </div>
                  <div
                    className="grid-cell grid-cell-avatar"
                    data-label="Avatar">
                    <img src={user.url} alt="avatar" />
                  </div>
                  <div
                    className="grid-cell grid-cell-actions"
                    data-label="Acciones">
                    <button onClick={() => handleEditUser(user._id)}>
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteUser(user._id, user.name, user.url)
                      }
                      className="delete-button">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {modalIsOpen && (
            <motion.div
              className="backDrop-modal"
              onClick={handleCloseModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <motion.div
                className="modal-container"
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                }}
                onClick={(e) => e.stopPropagation()}>
                <motion.button
                  onClick={handleCloseModal}
                  className="close-modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}>
                  ×
                </motion.button>
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}>
                  Agregar Usuario
                </motion.h2>
                <div className="preview_user">
                  <motion.div
                    className="preview_user-avatar"
                    whileHover={{ scale: 1.05 }}>
                    <img src={previewImage || avatar} alt="avatar" />
                  </motion.div>
                </div>
                <form
                  className="user_dashboard-form"
                  onSubmit={handleSubmitNewUser(handleNewUser)}>
                  <motion.input
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    {...registerNewUser("name")}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <motion.input
                    name="email"
                    type="email"
                    placeholder="Email"
                    {...registerNewUser("email")}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <motion.input
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...registerNewUser("password")}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                  <motion.select
                    {...registerNewUser("role")}
                    defaultValue=""
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}>
                    <option value="" disabled>
                      Selecciona un rol
                    </option>
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </motion.select>
                  <input
                    name="image"
                    placeholder="subir imagen"
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                  <motion.div
                    className={`drag_and_drop ${isDragging ? "dragging" : ""}`}
                    onClick={handleOpenPopup}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}>
                    <p>Arrastra y suelta tu imagen aquí</p>
                    <p>O</p>
                    <p>Haz click para subir</p>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmittingNewUser}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}>
                    {isSubmittingNewUser ? "Agregando..." : "Agregar"}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default UserDashBoard;
