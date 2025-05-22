import React from "react";
import "./Spinner.css";

export default function Spinner({ size = "medium", message = "Cargando..." }) {
  const sizeClass = {
    small: "spinner-small",
    medium: "spinner-medium",
    large: "spinner-large",
  }[size];

  return (
    <div className="spinner-overlay">
      <div className="spinner-content">
        <div className={`spinner ${sizeClass}`}></div>
        <p className="spinner-text">{message}</p>
      </div>
    </div>
  );
}
