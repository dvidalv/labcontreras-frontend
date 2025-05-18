import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./vendor/normalize.css";
import "./index.css";
import { AppProvider } from "./contexts/MyContext";
import RequireAuth from "./components/ProtectedRoute/RequireAuth.jsx";
import RequireAuthMedicos from "./components/ProtectedRoute/RequireAuthMedicos.jsx";

import App from "./routes/App/App.jsx";
import Main from "./routes/Main/Main.jsx";
import LayoutPacientes from "./routes/LayoutPacientes/LayoutPacientes.jsx";
import Paciente from "./routes/LayoutPacientes/Paciente/Paciente.jsx";
import NotFound from "./routes/NotFound/NotFound.jsx";
import Signin from "./routes/Forms/Sigin/Signin.jsx";
import { loader as hasAdmin } from "./routes/Forms/Sigin/signinLoader.js";
import Signup from "./routes/Forms/Signup/Signup.jsx";
import ForgotPassword from "./routes/Forms/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./routes/Forms/resetPassword/ResetPassword.jsx";
import MedicoSignin from "./routes/Forms/MedicoSignin/MedicoSignin.jsx";
import Contact from "./routes/Forms/Contact/Contact.jsx";
import Curriculum from "./routes/Curriculum/Curriculum.jsx";

import LayoutMedicos from "./routes/LayoutMedicos/LayoutMedico.jsx";
import { loader as loaderMedicos } from "./routes/LayoutMedicos/layoutMedicoLoader.jsx";

import { getMedicoById as loaderMedico } from "./utils/api";

import Medico from "./routes/LayoutMedicos/Medico/Medico.jsx";
import { action as actionMedico } from "./routes/LayoutMedicos/Medico/actionMedico.jsx";

import NuevoMedico from "./routes/LayoutMedicos/nuevoMedico/NuevoMedico.jsx";

import EditMedico from "./routes/LayoutMedicos/EditMedico/EditMedico.jsx";
import { loader as editMedicoLoader } from "./routes/LayoutMedicos/EditMedico/editMedicoLoader.jsx";

import Nosotros from "./routes/Nosotros/Nosotros.jsx";

import UserDashBoard from "./routes/Forms/UserDashBoard/UserDashBoard.jsx";
import { loader as userDashBoardLoader } from "./routes/Forms/UserDashBoard/UserDashBoardLoader.js";

import Resultados from "./routes/Resultados/Resultados.jsx";
import Publicaciones from "./routes/Publicaciones/Publicaciones.jsx";
import Publicacion from "./routes/Publicaciones/Publicacion.jsx";

import MisionVisionValores from "./routes/MisionVisionValores/MisionVisionValores.jsx";

import PacientesSugerenciasPage from "./routes/Sugerencias/PacientesSugerenciasPage.jsx";
import MedicosSugerenciasPage from "./routes/Sugerencias/MedicosSugerenciasPage.jsx";
import EmpresasSugerenciasPage from "./routes/Sugerencias/EmpresasSugerenciasPage.jsx";

import DerechosDeberesPacientes from "./routes/DerechosDeberesPacientes/DerechosDeberesPacientes.jsx";

import Reportes from "./routes/Reportes/Reportes.jsx";
import { loader as reportesLoader } from "./routes/Reportes/reportesLoader.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
        loader: loaderMedicos,
      },
      {
        path: "pacientes/",
        element: (
          <RequireAuth>
            <LayoutPacientes />
          </RequireAuth>
        ),
        children: [
          {
            path: ":id",
            element: <Paciente />,
          },
        ],
      },
      {
        path: "historia/",
        element: <Nosotros />,
      },
      {
        path: "nosotros/mision-vision-valores/",
        element: <MisionVisionValores />,
      },
      {
        path: "nosotros/derechos-deberes-pacientes/",
        element: <DerechosDeberesPacientes />,
      },
      {
        path: "publicaciones/",
        element: <Publicaciones />,
      },
      {
        path: "publicaciones/:id",
        element: <Publicacion />,
      },
      {
        path: "medicos/",
        element: (
          <RequireAuth>
            <LayoutMedicos />
          </RequireAuth>
        ),
        loader: loaderMedicos,
        action: actionMedico,
        children: [
          {
            path: ":id",
            element: <Medico />,
            loader: loaderMedico,
          },
          {
            path: ":id/edit",
            element: <EditMedico />,
            loader: editMedicoLoader,
          },
          {
            path: ":id/destroy",
            element: <h1>Eliminando...</h1>,
            errorElement: <h1>Hubo un error al eliminar el medico</h1>,
          },
          {
            path: "nuevo/",
            element: <NuevoMedico />,
          },
        ],
      },
      {
        path: "signup/",
        element: <Signup />,
      },
      {
        path: "signin/",
        element: <Signin />,
        loader: hasAdmin,
      },
      {
        path: "medico-signin/",
        element: <MedicoSignin />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "forgot-password/",
        element: <ForgotPassword />,
      },
      {
        path: "contact/",
        element: <Contact />,
      },
      {
        path: "user-dashboard/",
        element: (
          <RequireAuth>
            <UserDashBoard />
          </RequireAuth>
        ),
        loader: userDashBoardLoader,
      },
      {
        path: "reportes/",
        element: <Reportes />,
        loader: reportesLoader,
      },
      {
        path: "curriculum/",
        element: <Curriculum />,
      },
      {
        path: "resultados/",
        element: (
          <RequireAuthMedicos>
            <Resultados />
          </RequireAuthMedicos>
        ),
      },
      {
        path: "sugerencias/pacientes",
        element: <PacientesSugerenciasPage />,
      },
      {
        path: "sugerencias/medicos",
        element: <MedicosSugerenciasPage />,
      },
      {
        path: "sugerencias/empresas",
        element: <EmpresasSugerenciasPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
