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
import medicoAvatar from '../../images/medico-avatar.svg';
import Navbar from '../Navigation/Navbar';
import { useAppContext } from '../../contexts/MyContext';
import styled from 'styled-components';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";

Header.propTypes = {
	isMenuOpen: PropTypes.bool.isRequired,
	setIsMenuOpen: PropTypes.func.isRequired,
};

const Login = styled.a`
	color: black;
	@media (max-width: 768px) {
		display: none;
	}
`;

const Logout = styled.a`
	color: black;
	@media (max-width: 768px) {
		display: none;
	}
`;

// const medicoFoto = JSON.parse(localStorage.getItem('medicoUser'))?.foto;

function Header({ isMenuOpen, setIsMenuOpen }) {
	const location = useLocation();
	const {
		token,
		setToken,
		setShowTooltip,
		user,
		fileMakerToken,
		setFileMakerToken,
		setUser,
		medicoUser,
		setMedicoUser,
	} = useAppContext();

	const [isMenuFixed] = useState(false);

	const navigate = useNavigate();

	let medicoImage = JSON.parse(localStorage.getItem('medicoUser'))?.foto;
	// console.log(medicoImage);
	if (medicoImage === '') {
		medicoImage = medicoAvatar;
		// console.log(medicoImage);
	}
	// console.log(medicoUser);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('fileMakerToken');
		localStorage.removeItem('tokenTimestamp');
		localStorage.removeItem('medicoUser');
		setToken(null);
		setFileMakerToken(null);
		setShowTooltip(false);
		setUser({});
		setMedicoUser({});
		navigate('/');
	};

	// console.log(medicoUser);
	return (
		<header className={`header ${isMenuOpen ? 'open' : ''}`}>
			<div className="header__info">
				<div className="header__info-compania">
					<Link to="/" onClick={() => window.scrollTo(0, 0)}>
						<img src={logo} alt="logo LPCR" className="header-logo" />
					</Link>
					<div className="datos">
						<div className="info">
							<FaLocationDot className="header-icons" />
							<span>Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.</span>
						</div>
						<div className="info">
							<FaPhone className="header-icons" />
							<span>Tel. (809) 580-1429</span>
						</div>
						<div className="info">
							<IoMailOpen className="header-icons" />
							<span>info@contrerasrobledo.com.do</span>
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

					{medicoImage && (
						<div
							className="medico-user"
							style={{
								backgroundImage: `url(${medicoImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						></div>
					)}

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
						{!token && !fileMakerToken && (
							<Login href="#">
								<img
									onClick={() => navigate('/signin/')}
									src={login}
									alt="login"
									className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
								/>
								Login
							</Login>
						)}
						{token && !fileMakerToken && (
							<Logout href="#">
								<img
									onClick={() => handleLogout()}
									src={logout}
									alt="login"
									className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
								/>
								Logout
							</Logout>
						)}
						{fileMakerToken && (
							<Logout href="#">
								<img
									onClick={() => handleLogout()}
									src={logout}
									alt="login"
									className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
								/>
								Logout
							</Logout>
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
						user={user}
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
						user={user}
					/>
				}
				<div
					className="header__login"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{!token && !fileMakerToken && (
						<a href="#">
							<img
								onClick={() => navigate('/signin/')}
								src={login2}
								alt="login"
								className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
							/>
						</a>
					)}
					{(token || fileMakerToken) && (
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
