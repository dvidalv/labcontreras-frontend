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

	// const card = document.querySelector('.cards__item');
	// console.log(card);
	// card.addEventListener('click', function () {
	// 	card.classList.toggle('is-flipped');
	// });

	return (
		// <div className="scene">
		// 	<div className="cards__container">
		// 		<div className="cards__item">
		// 			<img src={imagen} alt={nombre} />
		// 			<p>{nombre}</p>
		// 		</div>
		// 		<div className="cards__item card__face--back"></div>
		// 	</div>
		// </div>

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
