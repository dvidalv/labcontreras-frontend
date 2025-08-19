/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { checkToken } from "../utils/auth";
const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [fileMakerToken, setFileMakerToken] = useState(
    localStorage.getItem("fileMakerToken") || null
  );
  const { toollTipIsLocated, setToollTipIsLocated } = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [medicos, setMedicos] = useState([]);
  const [medico, setMedico] = useState({});
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState({});
  const [medicoUser, setMedicoUser] = useState({});

  // console.log(medicoUser);
  // console.log(token);
  // console.log(fileMakerToken);

  // console.log("MyContext - user:", user);
  // console.log("MyContext - token:", token);
  // console.log("MyContext - loggedIn:", loggedIn);

  // Aquí puedes agregar funciones para modificar el estado, si es necesario
  // const updateSharedState = (newState) => {
  //   setSharedState(newState);
  // };

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true);
      try {
        const response = await checkToken(token);
        // console.log("Token verification response:", response);

        if (response && response.status === "success") {
          setToken(token);
          setUser(response.user);
          setLoggedIn(true);
          // console.log("User set in context:", response.user);
        } else {
          // Token is invalid or expired
          // console.log("Token verification failed:", response);
          setToken(null);
          setUser({});
          setLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        // console.error("Token verification failed:", error);
        // Clear invalid token
        setToken(null);
        setUser({});
        setLoggedIn(false);
        localStorage.removeItem("token");
      }
      setIsLoading(false);
    };

    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        showTooltip,
        setShowTooltip,
        message,
        setMessage,
        type,
        setType,
        loggedIn,
        setLoggedIn,
        token,
        setToken,
        toollTipIsLocated,
        setToollTipIsLocated,
        isLoading,
        setIsLoading,
        medicos,
        setMedicos,
        medico,
        setMedico,
        error,
        setError,
        avatarUrl,
        setAvatarUrl,
        location,
        setLocation,
        user,
        setUser,
        fileMakerToken,
        setFileMakerToken,
        medicoUser,
        setMedicoUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};
