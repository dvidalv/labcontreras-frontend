import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MenuLinkMobile.css";
import { IoIosArrowDown } from "react-icons/io";

function MenuLinkMobile({ to, text, isSubmenu, children, onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleArrowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (onClick) {
      onClick();
    }
    if (!isSubmenu) {
      setIsOpen(false);
    }
  };

  return (
    <div className="menu-link-mobile">
      <div>
        <Link to={to} onClick={handleLinkClick}>
          {text}
        </Link>
        {isSubmenu && (
          <IoIosArrowDown
            className={`arrow-icon ${isOpen ? "open" : ""}`}
            onClick={handleArrowClick}
          />
        )}
      </div>
      {isSubmenu && isOpen && <div className="submenu">{children}</div>}
    </div>
  );
}

MenuLinkMobile.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSubmenu: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

MenuLinkMobile.defaultProps = {
  isSubmenu: false,
};

export default MenuLinkMobile;
