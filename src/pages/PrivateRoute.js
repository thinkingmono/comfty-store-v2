import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

//Private route component to handle navigation access.
const PrivateRoute = ({ children }) => {
  //Destructure user from useAuth0
  const { user } = useAuth0();

  //If there is no user navigate to home.
  if (!user) {
    return <Navigate to='/' />
  }
  //Render children.
  return children
};
export default PrivateRoute;
