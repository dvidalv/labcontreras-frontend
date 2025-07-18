import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../../contexts/MyContext";
import "./UserDashBoard.css";
import avatar from "../../../images/avatar.svg";
import { RiMenuAddFill } from "react-icons/ri";
import {
  uploadAvatar,
  createUser,
  deleteImage,
  deleteUser,
  getUsers,
  updateUserStatus,
  sendInvitationEmail,
  getComprobantes,
} from "../../../utils/api";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { RiEditLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import NuevoComprobante from "../../../components/nuevo comprobante/NuevoComprobante";
import EditarComprobantes from "../../../components/EditarComprobantes/EditarComprobantes";

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
  const [activeTab, setActiveTab] = useState("users");
  const [showModal, setShowModal] = useState(false);
  const [comprobantesData, setComprobantesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingComprobantes, setLoadingComprobantes] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const { users: usersData, comprobantes } = useLoaderData();
  const hasAdminUser = usersData.some((user) => user.role === "admin");

  // console.log(comprobantes);

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
    if (comprobantes) {
      setComprobantesData(comprobantes);
    }
  }, [comprobantes]);

  // Cargar comprobantes cuando se monte el componente o cambie el token
  useEffect(() => {
    if (token && comprobantesData.length === 0) {
      refreshComprobantes();
    }
  }, [token]);

  // Función para actualizar la lista de comprobantes
  const refreshComprobantes = async () => {
    try {
      setLoadingComprobantes(true);
      const response = await getComprobantes(token);

      // Manejar la estructura de datos de comprobantes igual que en el loader
      const comprobantes =
        response?.comprobantes ||
        response?.data ||
        (Array.isArray(response) ? response : []);

      setComprobantesData(comprobantes);
    } catch (error) {
      console.error("Error al actualizar comprobantes:", error);
    } finally {
      setLoadingComprobantes(false);
    }
  };

  // Función para manejar la edición de comprobantes
  const handleEditComprobante = (comprobante) => {
    setSelectedComprobante(comprobante);
    setShowEditModal(true);
  };

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

  async function handleNewUser(data) {
    const file = data.image;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await uploadAvatar(formData);

      if (!uploadResponse.url) {
        throw new Error("No se recibió la URL de la imagen");
      }

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        url: uploadResponse.url,
      };

      const createUserResponse = await createUser(userData);
      console.log("Respuesta de la API:", createUserResponse);

      if (createUserResponse.user) {
        try {
          if (!token) {
            throw new Error("No hay token de autenticación");
          }
          const emailResponse = await sendInvitationEmail(
            data.email,
            data.name,
            data.password,
            token
          );
          if (emailResponse.status === "error") {
            throw new Error(
              emailResponse.message || "Error al enviar el email de invitación"
            );
          }
        } catch (emailError) {
          console.error("Error al enviar el email de invitación:", emailError);
          await Swal.fire({
            icon: "warning",
            title: "Usuario creado",
            text: "El usuario se creó correctamente pero hubo un error al enviar el email de invitación. Por favor, intente enviar el email más tarde.",
            showConfirmButton: true,
          });
        }

        await Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: "Se ha enviado un email de invitación al usuario",
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedUsersResponse = await getUsers();
        const filteredUsers = updatedUsersResponse.users.filter(
          (user) => user.role !== "admin"
        );
        setUsers(filteredUsers);

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
        if (userImageUrl) {
          await deleteImage(userImageUrl);
        }

        const response = await deleteUser({ userId, token });

        if (response.status === "error") {
          throw new Error(response.message);
        }

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

  const handleToggleDisable = async (userId) => {
    try {
      const newStatus = !users.find((user) => user._id === userId).isDisabled;
      const response = await updateUserStatus(userId, newStatus, token);
      console.log("response", response);

      if (response.status === "error") {
        throw new Error(
          response.message || "Error al actualizar el estado del usuario"
        );
      }

      setUsers(
        users.map((user) => {
          if (user._id === userId) {
            return { ...user, isDisabled: !user.isDisabled };
          }
          return user;
        })
      );

      await Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `Usuario ${
          newStatus ? "deshabilitado" : "habilitado"
        } correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo actualizar el estado del usuario",
      });
    }
  };

  // Función para filtrar comprobantes según el término de búsqueda
  const filteredComprobantes = comprobantesData.filter((comprobante) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      comprobante.rnc.toLowerCase().includes(searchLower) ||
      comprobante.razon_social.toLowerCase().includes(searchLower) ||
      comprobante.tipo_comprobante.toLowerCase().includes(searchLower) ||
      comprobante.descripcion_tipo.toLowerCase().includes(searchLower)
    );
  });

  // Función para manejar el cambio en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Función para manejar el cambio de tab
  const handleTabChange = async (tab) => {
    setActiveTab(tab);

    // Si cambia al tab de comprobantes y no hay datos, cargar comprobantes
    if (tab === "comprobantes" && comprobantesData.length === 0) {
      await refreshComprobantes();
    }
  };

  const renderUsersTab = () => (
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
              <div
                className={`grid-row ${user.isDisabled ? "disabled" : ""}`}
                key={user._id}>
                <div className="grid-cell grid-cell-name" data-label="Nombre">
                  {user.name}
                </div>
                <div className="grid-cell grid-cell-email" data-label="Email">
                  {user.email}
                </div>
                <div className="grid-cell grid-cell-role" data-label="Rol">
                  {user.role}
                </div>
                <div className="grid-cell grid-cell-avatar" data-label="Avatar">
                  <img src={user.url} alt="avatar" />
                </div>
                <div
                  className="grid-cell grid-cell-actions"
                  data-label="Acciones">
                  <button onClick={() => handleEditUser(user._id)}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleDisable(user._id)}
                    className={`disable-button ${
                      user.isDisabled ? "disabled" : ""
                    }`}>
                    {user.isDisabled ? "Habilitar" : "Deshabilitar"}
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
  );

  const renderComprobantesTab = () => (
    <div className="comprobantes-container">
      <div className="comprobantes-container-header">
        <div className="search-container">
          <div className="search-input-wrapper">
            <RiSearchLine className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar por RNC, razón social o tipo..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="clear-search-btn"
                title="Limpiar búsqueda">
                ×
              </button>
            )}
          </div>
        </div>
        <RiMenuAddFill
          className="comprobantes-container-icon"
          size={45}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="comprobantes-container-content">
        {loadingComprobantes ? (
          <div className="loading-message">Cargando comprobantes...</div>
        ) : filteredComprobantes.length > 0 ? (
          <div className="comprobantes-grid">
            {filteredComprobantes.map((comprobante) => (
              <div key={comprobante._id} className="comprobante-card">
                <div className="comprobante-header">
                  <h3>{comprobante.descripcion_tipo}</h3>
                  <button
                    className="edit-comprobante-btn"
                    onClick={() => handleEditComprobante(comprobante)}
                    title="Editar comprobante">
                    <RiEditLine size={16} />
                  </button>
                </div>
                <div className="comprobante-info">
                  <p>
                    <strong>RNC:</strong> {comprobante.rnc}
                  </p>
                  <p>
                    <strong>Razón Social:</strong> {comprobante.razon_social}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {comprobante.tipo_comprobante}
                  </p>
                  <p>
                    <strong>Prefijo:</strong> {comprobante.prefijo}
                  </p>
                  <p>
                    <strong>Rango:</strong> {comprobante.numero_inicial} -{" "}
                    {comprobante.numero_final}
                  </p>
                  <p>
                    <strong>Disponibles:</strong>{" "}
                    {comprobante.numeros_disponibles}
                  </p>
                  <p>
                    <strong>Utilizados:</strong>{" "}
                    {comprobante.numeros_utilizados}
                  </p>
                  <p>
                    <strong>Próximo Número:</strong> {comprobante.proximoNumero}
                  </p>
                  <p>
                    <strong>Estado:</strong>
                    <span className={`estado ${comprobante.estado}`}>
                      {" "}
                      {comprobante.estado}
                    </span>
                  </p>
                  <p>
                    <strong>Vencimiento:</strong>{" "}
                    {new Date(
                      comprobante.fecha_vencimiento
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            {searchTerm ? (
              <p>
                No se encontraron comprobantes que coincidan con {searchTerm}
              </p>
            ) : (
              <p style={{ textAlign: "center", color: "red" }}>
                No hay comprobantes disponibles
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => handleTabChange("users")}>
          Usuarios
        </button>
        <button
          className={`tab-button ${
            activeTab === "comprobantes" ? "active" : ""
          }`}
          onClick={() => handleTabChange("comprobantes")}>
          Comprobantes
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "users" ? renderUsersTab() : renderComprobantesTab()}
      </div>
      {showModal && (
        <NuevoComprobante
          setShowModal={setShowModal}
          showModal={showModal}
          token={token}
          refreshComprobantes={refreshComprobantes}
        />
      )}
      {showEditModal && selectedComprobante && (
        <EditarComprobantes
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          token={token}
          refreshComprobantes={refreshComprobantes}
          comprobante={selectedComprobante}
        />
      )}
    </div>
  );
}

export default UserDashBoard;
