import React from 'react';
import { UserContext } from './UserContext';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProtectedUserRoute = ({ children }) => {
  const location = useLocation();
  const { data } = React.useContext(UserContext);

  // Verificar se o usuário está logado e se o caminho é diferente de /customer/:user
  if (location.pathname !== '/customer/:user') {
    return children;
  }

  if (!data) {
    // Se o usuário não estiver logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedUserRoute;
