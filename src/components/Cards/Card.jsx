/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cards.css';
import mail2 from '../../images/mail2.svg';
import phoneOffice from '../../images/phone-office.svg';
import phone from '../../images/phone.svg';

function Cards({
	cargo,
	nombre,
	imagen,
	correo,
	telefono,
	celular,
	curriculumUrl,
	especialidad,
}) {
	const navigate = useNavigate();
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
					<p className="card__face__front__name">{nombre}</p>
					<p className="card__face__front__specialty">{especialidad}</p>
				</div>
				<div className="card__face card__face--back">
					<div className="card__back__info">
						<img src={imagen} alt={nombre} />
					</div>
					<h3>{cargo}</h3>
					<div className="card__text">
						<div className="card__text__item">
							<img src={mail2} alt="mail" />
							<span className="card__text correo">{correo}</span>
						</div>
						<div className="card__text__item">
							<img src={phoneOffice} alt="phone" />
							<span className="card__text telefono">{telefono}</span>
						</div>
						{/* <div className="card__text__item">
							<img src={phone} alt="celular" />
							<span className="card__text celular">{celular}</span>
						</div> */}
					</div>
					<div className="card__mas">
						<a onClick={() => navigate(curriculumUrl)}>
							{/* <p>Mas...</p> */}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cards;
