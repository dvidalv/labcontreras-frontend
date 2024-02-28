import PropTypes from 'prop-types';
import './header.css';
import logo from '../../images/logo.svg';
import pin from '../../images/pin.svg';
import phone from '../../images/telefono.svg';
import mail from '../../images/mail.svg';
import login from '../../images/login.svg';
import Navbar from '../Navigation/Navbar';

Header.propTypes = {
	isMenuOpen: PropTypes.bool.isRequired,
	setIsMenuOpen: PropTypes.func.isRequired,
};

function Header({ isMenuOpen, setIsMenuOpen }) {
	return (
		<header className={`header ${isMenuOpen ? 'open' : ''}`}>
			<div className="header__info">
				<div className="header__info-compania">
					<img src={logo} alt="logo LPCR" className="header-logo" />
					<div className="datos">
						<div className="info">
							<img src={pin} alt="pin" className="header-icons" />
							<span>Calle Juan Bautista Pérez No. 2</span>
						</div>
						<div className="info">
							<img src={phone} alt="phone" className="header-icons" />
							<span>Tel. 809-580-1429</span>
						</div>
						<div className="info">
							<img src={mail} alt="mail" className="header-icons" />
							<span>labcontreras@gmail.com</span>
						</div>
					</div>
				</div>

				<div className={`header__login ${isMenuOpen ? 'open' : ''}`}>
					{/* <img
						src={menumovil}
						alt="menu"
						className="header__menu-movil"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/> */}
					<div
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
					>
						<span className="menu-btn__burger"></span>
					</div>
					<a href="#">
						<img
							src={login}
							alt="login"
							className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
						/>
					</a>
				</div>
			</div>
			<div className={`header__menu ${isMenuOpen ? 'open' : ''}`}>
				{<Navbar bgColor="var(--color-gris)" isMenuOpen={isMenuOpen} />}
			</div>
			<div className={`otro-menu ${isMenuOpen ? 'open' : ''}`}>
				{
					<Navbar
						color="var(--color-blanco)"
						bgColor="var(--color-trasparente)"
						isMenuOpen={isMenuOpen}
						display={true}
					/>
				}
			</div>
		</header>
	);
}

export default Header;
