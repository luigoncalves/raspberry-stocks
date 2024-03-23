import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsPrivate = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // if the authentication is still loading

  if (isLoading) {
    <p>Loading</p>;
  }

  if (!isLoggedIn) {
    // if the user is not logged in
    return <Navigate to={'/login'} />;
  } else {
    // if the user is logged in, allow it to see the page
    return props.children;
  }
};

export default IsPrivate;

// this component checks if the user is logged in and if so, shows the Projects components (in App.jsx)
