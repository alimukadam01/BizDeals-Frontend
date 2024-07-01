import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Auth';

const ProtectedRoute = ({ path, element }) => {
    const auth = useAuth();

    // Check if the user is authenticated
    const saved = localStorage.getItem("user_name");

    const isAuthenticated = auth.user || saved;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;


/* const PrivateRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
} */