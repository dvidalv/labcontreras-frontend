import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Sugerencias.css";
import background1 from "../../images/background-1.jpg";
import background2 from "../../images/background-2.jpg";
import background3 from "../../images/background-3.jpg";
import background4 from "../../images/background-4.jpg";
import background5 from "../../images/background-5.jpg";
import MedicosSugerencias from "./components/MedicosSugerencias";

import "animate.css";

function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}
const number = getRandomNumber();

function MedicosSugerenciasPage() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const handleSubmitSuccess = (mensaje) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(mensaje);
    setShowBanner(true);

    timeoutRef.current = setTimeout(() => {
      setShowBanner(false);
      navigate("/");
    }, 5000);
  };

  let style = {
    backgroundImage: `url(${
      number === 1
        ? background1
        : number === 2
        ? background2
        : number === 3
        ? background3
        : number === 4
        ? background4
        : background5
    })`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="sugerencias-container" style={style}>
      {showBanner && (
        <div className="success-banner">
          <p style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
            {message}
          </p>
        </div>
      )}
      <h2 className="animate__animated animate__backInDown">
        Encuesta de Satisfacción - Médicos
      </h2>
      <MedicosSugerencias onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
}

export default MedicosSugerenciasPage;
