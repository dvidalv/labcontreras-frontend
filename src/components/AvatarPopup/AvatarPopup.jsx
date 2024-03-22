/* eslint-disable react/prop-types */
import './AvatarPopup.css';
import url from '../../utils/constants';
import { useEffect } from 'react';

function AvatarPopup({ onClose, isOpen, setIsOpen, setAvatarUrl }) {
	const handleSubirImagen = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		// Accede al formulario y crea un FormData directamente desde él
		const formData = new FormData(event.target);
		// console.log('formData', formData);

		try {
			const response = await fetch(`${url}/upload`, {
				method: 'POST',
				body: formData, // Usa formData directamente
				// No establezcas el encabezado 'Content-Type' cuando uses FormData
				// El navegador lo establecerá automáticamente con el 'boundary' correcto
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await response.json();
			// console.log(result.url);
			// const avatarUrl = result.url;
			if (result.url) {
				setIsOpen(false);
				setAvatarUrl(result.url);
			}
			// Aquí puedes manejar la respuesta, por ejemplo, mostrar la URL de la imagen subida
		} catch (error) {
			console.error('Error al subir el archivo:', error);
		}
	};

	// Efecto para escuchar la tecla Escape
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Enter' || event.key === 'Escape') {
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
		<div
			className={`overlay ${isOpen ? 'isOpen' : 'hidden'}`}
			onClick={onClose}
		>
			<form
				id="avatar-form"
				role="form"
				onSubmit={handleSubirImagen}
				encType="multipart/form-data"
				method="post"
				onClick={e => e.stopPropagation()}
			>
				<div className="form-group">
					<div className="input-file">
						<input
							type="file"
							id="imagen"
							name="image"
							placeholder="Imagen"
							style={{ color: 'red' }}
						/>
						<input type="submit" value="Subir" style={{ color: 'red' }} />
					</div>
				</div>
			</form>
		</div>
	);
}

export default AvatarPopup;
