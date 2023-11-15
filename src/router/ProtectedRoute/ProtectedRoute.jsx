import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ rol, children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const userRol = usuario ? usuario.role : null;

  if (!userRol || !rol.includes(userRol)) {
    return <Navigate to="/inicioReserva" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  rol: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;


