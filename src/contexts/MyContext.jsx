/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import { checkToken } from '../utils/auth';
const AppContext = createContext();

export function useAppContext() {
	return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState(localStorage.getItem('token') || null);
	const [fileMakerToken, setFileMakerToken] = useState(
		localStorage.getItem('FileMakerToken') || null
	);
	const { toollTipIsLocated, setToollTipIsLocated } = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [medicos, setMedicos] = useState([]);
	const [medico, setMedico] = useState({});
	const [error, setError] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [location, setLocation] = useState('');
	const [user, setUser] = useState({});
	const [medicoUser, setMedicoUser] = useState({});
	// console.log(token);
	// console.log(fileMakerToken);

	// console.log(user);

	// Aquí puedes agregar funciones para modificar el estado, si es necesario
	// const updateSharedState = (newState) => {
	//   setSharedState(newState);
	// };

	useEffect(() => {
		const verifyToken = async () => {
			setIsLoading(true);
			const response = await checkToken(token);
			if (response.status === 'success') {
				setToken(token);
				setUser(response.user);
			} else {
				setToken(null);
			}
			setIsLoading(false);
		};

		if (token) {
			verifyToken();
		} else {
			setIsLoading(false);
		}
	}, [token]);

	return (
		<AppContext.Provider
			value={{
				isMenuOpen,
				setIsMenuOpen,
				showTooltip,
				setShowTooltip,
				message,
				setMessage,
				type,
				setType,
				loggedIn,
				setLoggedIn,
				token,
				setToken,
				toollTipIsLocated,
				setToollTipIsLocated,
				isLoading,
				setIsLoading,
				medicos,
				setMedicos,
				medico,
				setMedico,
				error,
				setError,
				avatarUrl,
				setAvatarUrl,
				location,
				setLocation,
				user,
				setUser,
				fileMakerToken,
				setFileMakerToken,
				medicoUser,
				setMedicoUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
