import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { verify } from '../api/auth.api';

const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  // put the token in local storage
  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    // get token from localStorage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      try {
        const response = await verify(storedToken);

        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        //if the server cannnot authenticate the jwt
        console.log('Error occured authenticating user', error);
        setUser(null);
        setIsLoggedIn(null);
      }
    } else {
      //if token is not available
      setUser(null);
      setIsLoggedIn(false);
    }

    setIsLoading(false);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logoutUser = () => {
    //clear the localstorage
    removeToken();
    // update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        storeToken,
        authenticateUser,
        logoutUser,
        search,
        setSearch,
        watchlist,
        setWatchlist,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
