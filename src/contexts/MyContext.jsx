/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function useAppContext() {
	return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	// Aquí puedes agregar funciones para modificar el estado, si es necesario
	// const updateSharedState = (newState) => {
	//   setSharedState(newState);
	// };

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
