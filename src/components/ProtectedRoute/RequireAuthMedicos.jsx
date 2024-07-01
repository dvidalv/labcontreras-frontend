/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../contexts/MyContext';

function RequireAuthMedicos({ children }) {
	const { fileMakerToken } = useAppContext();
	console.log(fileMakerToken);
	let location = useLocation();
	let loginPath = location.pathname;

	if (!fileMakerToken) {
		if (loginPath.includes('resultado')) {
			return (
				<Navigate to="/medico-signin" state={{ from: location }} replace />
			);
		} else if (loginPath.includes('medicos')) {
			return <Navigate to="/signin" state={{ from: location }} replace />;
		}
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuthMedicos;
