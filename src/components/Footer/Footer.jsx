import pin from '../../images/pin.svg';
import phone from '../../images/telefono.svg';
import mail from '../../images/mail.svg';
import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import './footer.css';

function getCurrentYear() {
	const currentYear = new Date().getFullYear();
	return currentYear;
}

function Footer() {
	return (
		<footer className="footer">
			<div className="info-compania">
				<div className="datos">
					<div className="info">
						<img src={pin} alt="pin" className="icons-footer" />
						<span>Calle Juan Bautista Pérez No. 2</span>
					</div>
					<div className="info">
						<img src={phone} alt="phone" className="icons-footer" />
						<span>Tel. 809-580-1429</span>
					</div>
					<div className="info">
						<img src={mail} alt="mail" className="icons-footer" />
						<span>labcontreras@gmail.com</span>
					</div>
				</div>
			</div>
			<div className="redes-sociales">
				<a href="https://www.facebook.com/contrerasrobledo/?locale=es_LA" target="_blank" rel="noreferrer">
					<img src={facebook} alt="facebook" />
				</a>
				<a href="https://www.instagram.com/labcontrerasrobledo/" target="_blank" rel="noreferrer">
					<img src={instagram} alt="instagram" />
				</a>
			</div>
			<div className="derechos">
				<p className="animate__animated animate__backInLeft">
					Desarrollado por Giganet Services SRL
				</p>
				<span>
					© {getCurrentYear()} Laboratorio de Patología Contreras Robledo. Todos los derechos
					reservados.
				</span>
			</div>
		</footer>
	);
}

export default Footer;
