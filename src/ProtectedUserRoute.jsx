import React from 'react'
import { UserContext } from './UserContext'
import { Navigate } from 'react-router-dom';

const ProtectedUserRoute = ({children}) => {
    const {data} = React.useContext(UserContext);

  return data ? children : <Navigate to="/login"/>
}

export default ProtectedUserRoute