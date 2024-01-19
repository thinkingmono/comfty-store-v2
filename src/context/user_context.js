import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

//User context creation
const UserContext = React.createContext();

//User provider configuration. Destructure children from props.
export const UserProvider = ({ children }) => {
  //Destructure loginWithRedirect, logout and user from Auth0 hook.
  const { loginWithRedirect, logout, user } = useAuth0();

  //myUser state variable declaration- Initialize as null.
  const [myUser, setMyUser] = useState(null);

  //Set myUser every time Auth0 user changes.
  useEffect(() => {
    setMyUser(user)
  }, [user]);

  return (
    //User provider to share state values and functions. Wrap children components.
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>{children}</UserContext.Provider>
  )
}
//Custom hook creation to access user context.
export const useUserContext = () => {
  return useContext(UserContext)
}
