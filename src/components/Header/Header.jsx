import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../../images/logo.svg';
import pin from '../../images/pin.svg';
import phone from '../../images/telefono.svg';
import mail from '../../images/mail.svg';
import login from '../../images/login.svg';
import login2 from '../../images/login-2.svg';
import logout from '../../images/logout.svg';
import logout2 from '../../images/logout-2.svg';
import Navbar from '../Navigation/Navbar';
import { useAppContext } from '../../contexts/MyContext';

Header.propTypes = {
	isMenuOpen: PropTypes.bool.isRequired,
	setIsMenuOpen: PropTypes.func.isRequired,
};

function Header({ isMenuOpen, setIsMenuOpen }) {
	const location = useLocation();
	const { token, setToken, setShowTooltip, user } = useAppContext();

	const [isMenuFixed] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setShowTooltip(false);
		navigate('/signin/');
	};

	const navigate = useNavigate();
	const navigae = (url) => {
		navigate(url);
	};
	return (
		<header className={`header ${isMenuOpen ? 'open' : ''}`}>
			<div className="header__info">
				<div className="header__info-compania">
					<Link to="/">
						<img src={logo} alt="logo LPCR" className="header-logo" />
					</Link>
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

				<div className="header__user">
					<div className="header__user_info">
						<div className="header__user_info--user">
							{token && (
								<Link to="/user-dashboard">
									<div className="header__user_info--user--img">
										<img
											src={user.url}
											alt="user"
											className="header__user_info--user--img"
										/>
									</div>
									<span className="header__user_info--user--name">
										Bienvenido, {user.name}
									</span>
								</Link>
							)}
						</div>
					</div>

					<div className={`header__login ${isMenuOpen ? 'open' : ''}`}>
						<div
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
						>
							<div className="menu-btn__burger">
								<div className={`bar1 ${isMenuOpen ? 'change' : ''}`}></div>
								<div className={`bar2 ${isMenuOpen ? 'change' : ''}`}></div>
								<div className={`bar3 ${isMenuOpen ? 'change' : ''}`}></div>
							</div>
						</div>
						{!token && (
							<a href="#">
								<img
									onClick={() => navigae('/signin/')}
									src={login}
									alt="login"
									className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
								/>
							</a>
						)}
						{token && (
							<a href="#">
								<img
									onClick={() => handleLogout()}
									src={logout}
									alt="login"
									className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
								/>
							</a>
						)}
					</div>
				</div>
			</div>
			<div
				className={`header__menu ${isMenuOpen ? 'open' : ''} ${
					isMenuFixed && !isMenuOpen ? 'headerFixed' : ''
				}`}
			>
				{location.pathname !== '/resultados' && (
					<Navbar
						bgColor="var(--color-gris)"
						isMenuOpen={isMenuOpen}
						setIsMenuOpen={setIsMenuOpen}
					/>
				)}
			</div>
			<div className={`menu-lateral ${isMenuOpen ? 'open' : ''}`}>
				{
					<Navbar
						color="var(--color-white)"
						bgColor="var(--color-trasparente)"
						isMenuOpen={isMenuOpen}
						display={true}
						setIsMenuOpen={setIsMenuOpen}
					/>
				}
				<div
					className="header__login"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{!token && (
						<a href="#">
							<img
								onClick={() => navigae('/signin/')}
								src={login2}
								alt="login"
								className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
							/>
						</a>
					)}
					{token && (
						<a href="#">
							<img
								onClick={() => handleLogout()}
								src={logout2}
								alt="login"
								className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
							/>
						</a>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
