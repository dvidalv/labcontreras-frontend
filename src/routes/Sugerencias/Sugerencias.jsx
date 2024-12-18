import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Sugerencias.css';
import { sugerencias } from '../../utils/api';

const sugerenciaSchema = z.object({
  mensaje: z
    .string({
      required_error: 'El mensaje es requerido',
    })
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no puede exceder los 500 caracteres')
    .trim(),
});

function Sugerencias() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sugerenciaSchema),
  });

  const onSubmit = async (data) => {
		// console.log(data)
    try {
      const res = await sugerencias(data);
			const { mensaje } = res;
      setMessage(mensaje);
      // console.log(res);
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
            {message}
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
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar sugerencia'}
        </button>
      </Form>
    </div>
  );
}

export default Sugerencias; 