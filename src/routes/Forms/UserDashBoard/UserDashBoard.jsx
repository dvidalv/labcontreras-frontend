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
// import { useLoaderData } from 'react-router-dom';

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
  // const medicos = useLoaderData();

  // useEffect(() => {
  // 	if (medicos.length > 0) {
  // 		setMedicosWhiteList(medicos);
  // 	}
  // }, [medicos]);

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

    // const file = e.dataTransfer.files[0];
    // if (file) {
    //   handleFileChange(file);
    // }
  };

  return (
    <div className="dashboard-container">
      <div className="user_dashboard">
        <div className="section user_dashboard-container">
          <h2>Dashboard</h2>
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
        </div>

        <div className="section user_dashboard-container">
          <h2>Agregar Usuario</h2>
          <div className="preview_user">
            <div className="preview_user-avatar">
              <img src={previewImage || avatar} alt="avatar" />
            </div>
            <div className="preview_user-info">
              <h3>Nombre</h3>
            </div>
          </div>
          <form
            className="user_dashboard-form"
            onSubmit={handleSubmitNewUser(handleNewUser)}>
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              {...registerNewUser("name")}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              {...registerNewUser("email")}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              {...registerNewUser("password")}
            />
            <select {...registerNewUser("role")} defaultValue="">
              <option value="" disabled>
                Selecciona un rol
              </option>
              <option value="user">Usuario</option>
              <option value="medico">Médico</option>
              <option value="admin">Administrador</option>
              <option value="guest">Invitado</option>
            </select>
            <input
              name="image"
              placeholder="subir imagen"
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/*"
            />
            <div
              className={`drag_and_drop ${isDragging ? "dragging" : ""}`}
              onClick={handleOpenPopup}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}>
              <p>Arrastra y suelta tu imagen aquí</p>
              <p>O</p>
              <p>Haz click para subir</p>
            </div>

            <button type="submit" disabled={isSubmittingNewUser}>
              {isSubmittingNewUser ? "Agregando..." : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
