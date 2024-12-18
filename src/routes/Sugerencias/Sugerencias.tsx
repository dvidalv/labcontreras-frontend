import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Sugerencias.css';

// Definimos el esquema de validación con Zod
const sugerenciaSchema = z.object({
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no puede exceder los 500 caracteres')
    .nonempty('El mensaje es requerido')
    .trim(),
});

// Definimos el tipo usando interface en lugar de type
interface SugerenciaFormData {
  mensaje: string;
}

function Sugerencias() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SugerenciaFormData>({
    resolver: zodResolver(sugerenciaSchema),
  });

  const onSubmit = async (data: SugerenciaFormData) => {
    try {
      // Aquí puedes agregar la lógica para enviar la sugerencia
      // Por ejemplo, hacer una llamada a la API
      console.log(data);
      
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Error al enviar sugerencia:', error);
    }
  };

  return (
    <div className="sugerencias-container">
      {showBanner && (
        <div className="success-banner">
          <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            ¡Tu mensaje fue enviado correctamente!
          </p>
        </div>
      )}
      <h2>Envíanos tus sugerencias</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <textarea
            {...register('mensaje')}
            placeholder="Escribe tu mensaje aquí..."
            rows={6}
            className={errors.mensaje ? 'error' : ''}
          />
          {errors.mensaje && (
            <span className="error-message">{errors.mensaje.message}</span>
          )}
        </div>
        <button className="button" type="submit">
          Enviar sugerencia
        </button>
      </Form>
    </div>
  );
}

export default Sugerencias; 