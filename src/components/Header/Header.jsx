import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./header.css";
import logo from "../../images/logo.svg";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import medicoAvatar from "../../images/medico-avatar.svg";
import Navbar from "../Navigation/Navbar";
import { useAppContext } from "../../contexts/MyContext";
import styled from "styled-components";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";

import MenuLinkMobile from "../DropDown/MenuLinkMobile";
import { menuLinks } from "../../utils/constants";
import DropDown from "../DropDown/DropDown";
import { IoMdLogOut } from "react-icons/io";
import { motion } from "framer-motion";
const getViewportWidth = () => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};

const Logout = styled.a`
  color: black;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth());
  // console.log(isMenuOpen);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (viewportWidth > 768) {
      setIsMenuOpen(false);
    }
  }, [viewportWidth, setIsMenuOpen]);

  const location = useLocation();
  const {
    token,
    setToken,
    setShowTooltip,
    user,
    fileMakerToken,
    setFileMakerToken,
    setUser,
    setMedicoUser,
  } = useAppContext();
  const { role } = user;
  // console.log(role);
  // console.log(isMenuOpen);

  // console.log(medicoUser);

  const [isMenuFixed] = useState(false);

  const navigate = useNavigate();

  const medicoData = {
    nombre: JSON.parse(localStorage.getItem("medicoUser"))?.nombre,
    apellido: JSON.parse(localStorage.getItem("medicoUser"))?.apellido,
    foto: JSON.parse(localStorage.getItem("medicoUser"))?.foto,
  };
  // console.log(medicoImage);
  if (medicoData.foto === "") {
    medicoData.foto = medicoAvatar;
    // console.log(medicoImage);
  }
  // console.log(medicoUser);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fileMakerToken");
    localStorage.removeItem("tokenTimestamp");
    localStorage.removeItem("medicoUser");
    setIsMenuOpen(false);
    setToken(null);
    setFileMakerToken(null);
    setShowTooltip(false);
    setUser({});
    setMedicoUser({});
    navigate("/");
  };

  return (
    <header className={`contenedor header ${isMenuOpen ? "open" : ""}`}>
      <div className="header__info">
        <div className="header__info-compania">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <motion.img
              src={logo}
              alt="logo LPCR"
              className="header-logo"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
          </Link>
          <motion.div
            className="datos"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}>
            <div className="info">
              <FaLocationDot className="header-icons" />
              <a
                href="https://maps.app.goo.gl/Ehop7VTXqgbqtkbn8"
                target="_blank"
                rel="noreferrer">
                Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.
              </a>
            </div>
            <div className="info">
              <FaPhone className="header-icons" />
              <a href="tel:8095801429">Tel. (809) 580-1429</a>
            </div>
            <div className="info">
              <IoMailOpen className="header-icons" />
              <a href="mailto:info@contrerasrobledo.com.do">
                informacion@contrerasrobledo.com.do
              </a>
            </div>
          </motion.div>
        </div>

        <div className="header__user">
          <div className="header__user_info">
            <div className="header__user_info--user">
              {token && (
                <Link to={`${role === "admin" ? "/user-dashboard" : ""}`}>
                  <div className="header__user_info--user--img">
                    <img
                      src={user.url}
                      alt="user"
                      className="header__user_info--user--img"
                    />
                  </div>
                  <span className="header__user_info--user--name">
                    Bienvenido, {user.name}
                  </span>
                </Link>
              )}
            </div>
            {medicoData.foto && (
              <div className="header__user_info--medico">
                <div
                  className="medico-user"
                  style={{
                    backgroundImage: `url(${medicoData.foto})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}></div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "black",
                  }}>{`${medicoData.nombre} ${medicoData.apellido}`}</span>
              </div>
            )}
          </div>

          <div className={`header__login ${isMenuOpen ? "open" : ""}`}>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`menu-btn ${isMenuOpen ? "open" : ""}`}>
              <div className="menu-btn__burger">
                <div className={`bar1 ${isMenuOpen ? "change" : ""}`}></div>
                <div className={`bar2 ${isMenuOpen ? "change" : ""}`}></div>
                <div className={`bar3 ${isMenuOpen ? "change" : ""}`}></div>
              </div>
            </div>
            {!token && !fileMakerToken && (
              <LoginLink to="/signin">
                <img
                  src={login}
                  alt="login"
                  className={`header__login-icon ${isMenuOpen ? "open" : ""}`}
                  style={{ width: "30px", height: "30px" }}
                />
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "10px",
                    marginLeft: "5px",
                    textDecoration: "none",
                  }}></span>
              </LoginLink>
            )}
            {token && !fileMakerToken && (
              <Logout href="#">
                <img
                  onClick={() => handleLogout()}
                  src={logout}
                  alt="logout"
                  className={`header__login-icon ${isMenuOpen ? "open" : ""}`}
                  style={{ width: "30px", height: "30px" }}
                />
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "10px",
                    marginLeft: "5px",
                    textDecoration: "none",
                  }}>
                  {/* {!isMenuOpen && viewportWidth > 768 ? "Logout" : ""} */}
                </span>
              </Logout>
            )}
            {fileMakerToken && (
              <Logout
                href="#"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  justifyContent: "center",
                }}>
                <img
                  onClick={() => handleLogout()}
                  src={logout}
                  alt="login"
                  className={`header__login-icon ${isMenuOpen ? "open" : ""}`}
                  style={{ width: "30px", height: "30px" }}
                />
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "10px",
                    textDecoration: "none",
                  }}>
                  {/* {!isMenuOpen && viewportWidth > 768 ? "Logout" : ""} */}
                </span>
              </Logout>
            )}
          </div>
        </div>
      </div>
      <div
        className={`header__menu ${isMenuOpen ? "open" : ""} ${
          isMenuFixed && !isMenuOpen ? "headerFixed" : ""
        }`}>
        {location.pathname !== "/resultados" && (
          <Navbar
            bgColor="var(--color-gris)"
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            user={user}
          />
        )}
      </div>
      <div className={`menu-lateral ${isMenuOpen ? "open" : ""}`}>
        {menuLinks.map((link) => {
          if (link.submenu) {
            // console.log(link.submenu);
          }
          if (!user || (user.role !== "admin" && link.to !== "/medicos")) {
            return (
              <MenuLinkMobile
                key={link.to}
                to={link.to}
                text={link.text}
                isSubmenu={link.submenu ? true : false}
                onClick={() => setIsMenuOpen(false)}>
                {link.submenu &&
                  link.submenuItems.map((subItem) => {
                    // console.log(subItem);
                    return (
                      <div
                        key={subItem.to}
                        className="container-dropdown__link">
                        <DropDown
                          // setOpenSubmenu={() => {}}
                          to={subItem.to}
                          text={subItem.text}
                          onClick={() => setIsMenuOpen(false)}
                        />
                      </div>
                    );
                  })}
              </MenuLinkMobile>
            );
          } else if (user.role === "admin") {
            return (
              <MenuLinkMobile
                key={link.to}
                to={link.to}
                text={link.text}
                isSubmenu={link.submenu ? true : false}
              />
            );
          }
        })}
        {localStorage.getItem("medicoUser") && (
          <div
            className="menu-lateral__logout"
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
            }}
            onClick={handleLogout}>
            <IoMdLogOut size={32} color="white" />
            <span style={{ fontSize: "1rem", color: "white" }}>
              Cerrar Sesión
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default Header;
