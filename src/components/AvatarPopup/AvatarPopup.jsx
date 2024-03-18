/* eslint-disable react/prop-types */
import { useState } from 'react';
import './AvatarPopup.css';
import { Form } from 'react-router-dom';
import { useEffect } from 'react';

function AvatarPopup({ onClose, isOpen}) {
	// Efecto para escuchar la tecla Escape
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		// Agregar el escuchador de eventos al documento
		document.addEventListener('keydown', handleKeyDown);

		// Limpiar el escuchador de eventos del documento cuando el componente se desmonte
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose, isOpen]);

	return (
		<div className={`overlay ${isOpen ? 'isOpen' : 'hidden'}`} onClick={onClose}>
			<Form id="avatar-form" role="form">
				<div className="form-group">
					{/* <p className="label">Imagen</p> */}
					<div className="input-file">
						<input type="file" id="imagen" name="imagen" placeholder="Imagen" />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default AvatarPopup;
