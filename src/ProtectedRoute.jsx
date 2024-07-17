
import { Route, Navigate, Routes } from 'react-router-dom';

const isAuthenticated = () => {
    const authToken = localStorage.getItem('token');
    return authToken !== null;
};

const ProtectedRoute = ({ children, path, ...rest }) => {
    return isAuthenticated() ? (
        <Routes>
            <Route path={path} {...rest}>
                {children}
            </Route>
        </Routes>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
