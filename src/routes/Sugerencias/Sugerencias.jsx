import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import './Sugerencias.css';

function Sugerencias() {
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar la sugerencia
    // Por ejemplo, hacer una llamada a la API
    
    alert('¡Gracias por tu sugerencia!');
    navigate('/');
  };

  return (
    <div className="sugerencias-container">
      <h2>Envíanos tus sugerencias</h2>
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="mensaje">Tu mensaje:</label> */}
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            rows="6"
						placeholder="Escribe tu mensaje aquí..."
          />
        </div>
        <button type="submit">Enviar sugerencia</button>
      </Form>
    </div>
  );
}

export default Sugerencias; 