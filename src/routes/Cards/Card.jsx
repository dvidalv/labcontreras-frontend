import React, { useState } from 'react';
import './cards.css';
function Cards({
	cargo,
	nombre,
	imagen,
	correo,
	telefono,
	extension,
	celular,
}) {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		// Cambiamos el estado cada vez que se hace clic en la tarjeta
		setIsFlipped(!isFlipped);
	};


	return (
		<div className="scene" onClick={handleClick}>
			<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
				<div className="card__face card__face--front">
					<img src={imagen} alt={nombre} />
					<p>{nombre}</p>
				</div>
				<div className="card__face card__face--back">
					<h3>{cargo}</h3>
					<p className="card__text correo">{correo}</p>
					<p className="card__text telefono">{telefono}</p>
					<p className="card__text extension">{extension}</p>
					<p className="card__text celular">{celular}</p>
				</div>
			</div>
		</div>
	);
}

export default Cards;
