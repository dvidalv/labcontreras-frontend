import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../../images/logo.svg';
import login from '../../images/login.svg';
import logout from '../../images/logout.svg';
import medicoAvatar from '../../images/medico-avatar.svg';
import Navbar from '../Navigation/Navbar';
import { useAppContext } from '../../contexts/MyContext';
import styled from 'styled-components';
import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import { IoMailOpen } from 'react-icons/io5';

import MenuLinkMobile from '../DropDown/MenuLinkMobile';
import { menuLinks } from '../../utils/constants';
import DropDown from '../DropDown/DropDown';

const getViewportWidth = () => {
	return Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);
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

function Header({ isMenuOpen, setIsMenuOpen }) {
	const [viewportWidth, setViewportWidth] = useState(getViewportWidth());
	// console.log(isMenuOpen);
	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(getViewportWidth());
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (viewportWidth > 768) {
			setIsMenuOpen(false);
		}
	}, [viewportWidth, setIsMenuOpen]);

	const location = useLocation();
	const {
		token,
		setToken,
		setShowTooltip,
		user,
		fileMakerToken,
		setFileMakerToken,
		setUser,
		setMedicoUser,
	} = useAppContext();
	// console.log(user);
	// console.log(isMenuOpen);

	// console.log(medicoUser);

	const [isMenuFixed] = useState(false);

	const navigate = useNavigate();

	const medicoData = {
		nombre: JSON.parse(localStorage.getItem('medicoUser'))?.nombre,
		apellido: JSON.parse(localStorage.getItem('medicoUser'))?.apellido,
		foto: JSON.parse(localStorage.getItem('medicoUser'))?.foto,
	};
	// console.log(medicoImage);
	if (medicoData.foto === '') {
		medicoData.foto = medicoAvatar;
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
		<header className={`contenedor header ${isMenuOpen ? 'open' : ''}`}>
			<div className="header__info">
				<div className="header__info-compania">
					<Link to="/" onClick={() => window.scrollTo(0, 0)}>
						<img src={logo} alt="logo LPCR" className="header-logo" />
					</Link>
					<div className="datos">
						<div className="info">
							<FaLocationDot className="header-icons" />
							<a
								href="https://maps.app.goo.gl/Ehop7VTXqgbqtkbn8"
								target="_blank"
								rel="noreferrer"
							>
								Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.
							</a>
						</div>
						<div className="info">
							<FaPhone className="header-icons" />
							<a href="tel:8095801429">Tel. (809) 580-1429</a>
						</div>
						<div className="info">
							<IoMailOpen className="header-icons" />
							<a href="mailto:info@contrerasrobledo.com.do">
								informacion@contrerasrobledo.com.do
							</a>
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
						{medicoData.foto && (
							<div className="header__user_info--medico">
								<div
									className="medico-user"
									style={{
										backgroundImage: `url(${medicoData.foto})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
									}}
								></div>
								<span
									style={{ fontSize: '8px', color: 'black' }}
								>{`${medicoData.nombre} ${medicoData.apellido}`}</span>
							</div>
						)}
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
						{!token && !fileMakerToken && (
							<Login href="#">
								<img
									onClick={() => navigate('/signin/')}
									src={login}
									alt="login"
									className={`header__login-icon ${isMenuOpen ? 'open' : ''}`}
								/>
								{!isMenuOpen && viewportWidth > 768 ? 'Login' : ''}
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
								{!isMenuOpen && viewportWidth > 768 ? 'Logout' : ''}
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
								{!isMenuOpen && viewportWidth > 768 ? 'Logout' : ''}
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
				{menuLinks.map((link) => {
					if (link.submenu) {
						// console.log(link.submenu);
					}
					if (!user || (user.role !== 'admin' && link.to !== '/medicos')) {
						return (
							<MenuLinkMobile
								key={link.to}
								to={link.to}
								text={link.text}
								isSubmenu={link.submenu ? true : false}
							>
								{link.submenu &&
									link.submenuItems.map((subItem) => {
										// console.log(subItem);
										return (
											<div
												key={subItem.to}
												className="container-dropdown__link"
											>
												<DropDown
													// setOpenSubmenu={() => {}}
													to={subItem.to}
													text={subItem.text}
												/>
											</div>
										);
									})}
							</MenuLinkMobile>
						);
					} else if (user.role === 'admin') {
						return (
							<MenuLinkMobile
								key={link.to}
								to={link.to}
								text={link.text}
								isSubmenu={link.submenu ? true : false}
							/>
						);
					}
				})}
			</div>
		</header>
	);
}

Header.propTypes = {
	isMenuOpen: PropTypes.bool.isRequired,
	setIsMenuOpen: PropTypes.func.isRequired,
};

export default Header;
