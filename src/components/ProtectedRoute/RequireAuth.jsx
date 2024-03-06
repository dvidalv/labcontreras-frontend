import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../contexts/MyContext';

function RequireAuth({ children }) {
  const { token } = useAppContext();
  let location = useLocation();

  if (!token) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;

