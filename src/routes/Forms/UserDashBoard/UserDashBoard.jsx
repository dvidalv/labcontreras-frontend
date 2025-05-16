import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../../contexts/MyContext";
import "./UserDashBoard.css";
import avatar from "../../../images/avatar.svg";
import { uploadAvatar, createUser, deleteImage } from "../../../utils/api";
import Swal from "sweetalert2";
import { updateUser } from "../../../utils/api";
import { useEffect, useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  role: z.string().min(3).max(10),
  tel: z.string().min(10).max(12),
});

const schemaNewUser = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  role: z.string().min(3).max(10),
  image: z.instanceof(File),
  password: z.string().min(4).max(30),
});

function UserDashBoard() {
  // const [medicosWhiteList, setMedicosWhiteList] = useState([]);
  const { setUser, user, avatarUrl, setAvatarUrl, token } = useAppContext();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { users: usersData } = useLoaderData();
  console.log(usersData);

  useEffect(() => {
    if (usersData.length > 0) {
      setUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    setAvatarUrl("");
  }, [setAvatarUrl]);

  const {
    register: registerDashboard,
    handleSubmit: handleSubmitDashboard,
    setError: setErrorDashboard,
    reset: resetDashboard,
    formState: {
      errors: errorsDashboard,
      isSubmitting: isSubmittingDashboard,
      isValid: isValidDashboard,
    },
  } = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      tel: user.tel || "",
      role: user.role || "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    reset,
    register: registerNewUser,
    handleSubmit: handleSubmitNewUser,
    setValue: setValueNewUser, // para el archivo
    formState: { errors: errorsNewUser, isSubmitting: isSubmittingNewUser },
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

  async function handleForm(data) {
    data = { ...data, _id: user._id, url: avatarUrl };
    try {
      const response = await updateUser({ data, token });
      setUser({ ...user, ...response.user });
      if (!response.user) {
        setErrorDashboard("root", {
          type: "manual",
          message: "No se pudo actualizar el usuario",
        });
        return;
      }
    } catch (err) {
      console.error(err);
      setErrorDashboard("root", {
        type: "manual",
        message: "Ha ocurrido un error al intentar actualizar el usuario",
      });
    } finally {
      resetDashboard({
        name: "",
        email: "",
        tel: "",
        role: "",
      });
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

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

      // console.log("Nuevo usuario:", userData);

      // Aquí puedes agregar la llamada a la API para crear el usuario
      const createUserResponse = await createUser(userData);
      console.log("Respuesta de la API:", createUserResponse);
      if (createUserResponse.user) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          showConfirmButton: false,
          timer: 1500,
        });
        //reseteamos el formulario
        reset({
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

  function handleOpenPopup() {
    fileInputRef.current.click();
  }

  //   const handleFileChange = async (file) => {
  //     if (file && file.type.startsWith("image/")) {
  //       setPreviewImage(URL.createObjectURL(file));

  //       const formData = new FormData();
  //       formData.append("image", file);
  //       try {
  //         const response = await uploadAvatar(formData);
  //         if (response.url) {
  //           setAvatarUrl(response.url);
  //           setValueNewUser("image", response.url);
  //           Swal.fire({
  //             icon: "success",
  //             title: "Imagen cargada exitosamente",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error al subir la imagen:", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error al subir la imagen",
  //           text: "Por favor, intenta de nuevo",
  //         });
  //       }
  //     } else if (file) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Formato no válido",
  //         text: "Por favor, selecciona un archivo de imagen",
  //       });
  //     }
  //   };

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

  return (
    <div className="dashboard-container">
      <div className="user_dashboard">
        {/* <div">
            <h2>Agregar Usuario</h2>
            <div
              className="user_dashboard-container-img"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img
              src={user.url}
              alt="avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <form
            className="user_dashboard-form"
            onSubmit={handleSubmitDashboard(handleForm)}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              {...registerDashboard("name")}
            />
            <p className="error">
              {errorsDashboard.name && errorsDashboard.name.message}
            </p>

            <select {...registerDashboard("role")}>
              <option value="" disabled>
                Selecciona un rol
              </option>
              <option value="user">Usuario</option>
              <option value="medico">Médico</option>
              <option value="admin">Administrador</option>
              <option value="guest">Invitado</option>
            </select>
            <p className="error">
              {errorsDashboard.role && errorsDashboard.role.message}
            </p>

            <input placeholder="Email" {...registerDashboard("email")} />
            <p className="error">
              {errorsDashboard.email && errorsDashboard.email.message}
            </p>

            <input placeholder="Telefono" {...registerDashboard("tel")} />
            <p className="error">
              {errorsDashboard.tel && errorsDashboard.tel.message}
            </p>

            <button
              className={`user_dashboard-form-button ${
                !isValidDashboard || isSubmittingDashboard ? "disabled" : ""
              }`}
              disabled={!isValidDashboard || isSubmittingDashboard}
              type="submit">
              {isSubmittingDashboard ? "Enviando..." : "Enviar"}
            </button>
            {errorsDashboard.root && (
              <p className="error">{errorsDashboard.root.message}</p>
            )}
            </form>
          </div> */}

        <div className="section user_dashboard-container">
          <div className="user_dashboard-container-header">
            <IoPersonAddSharp
              className="user_dashboard-container-header-icon"
              onClick={() => setModalIsOpen(true)}
            />
            <h2>Lista de Usuarios</h2>
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
                  <div className="grid-cell grid-cell-name">{user.name}</div>
                  <div className="grid-cell grid-cell-email">{user.email}</div>
                  <div className="grid-cell grid-cell-role">{user.role}</div>
                  <div className="grid-cell grid-cell-avatar">
                    <img src={user.url} alt="avatar" />
                  </div>
                  <div className="grid-cell grid-cell-actions">
                    <button>Editar</button>
                    <button>Eliminar</button>
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
                    <option value="user">Usuario</option>
                    <option value="medico">Médico</option>
                    <option value="admin">Administrador</option>
                    <option value="guest">Invitado</option>
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
