import Navbar from '../Navigation/Navbar';
import pin from '../../images/pin.svg';
import phone from '../../images/telefono.svg';
import mail from '../../images/mail.svg';
import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import './footer.css';
function Footer() {
	return (
		<footer className="footer">
			<div className="info-compania">
				<Navbar color="var(--color-white)" bgColor="var(--color-transparent" />
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
				<a href="#" target="_blank" rel="noreferrer">
					<img src={facebook} alt="facebook" />
				</a>
				<a href="#" target="_blank" rel="noreferrer">
					<img src={instagram} alt="instagram" />
				</a>
			</div>
			<div className="derechos">
				<span>© 2021 Laboratorio de Patología Contreras Robledo. Todos los derechos reservados.</span>
			</div>
		</footer>
	);
}

export default Footer;
