import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const { authenticateUser } = useContext(AuthContext);
  const { storeToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password };

    try {
      //login response with the jwt token
      const response = await login(user);
      console.log(response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.log('Error loging in', error);
      // we are getting this from our backend
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type='submit'>Log In</button>
      </form>
      {error && <p>{error}</p>}

      <p>Don't have an account?</p>
      <Link to={'/signup'}>Sign Up</Link>
    </div>
  );
}

export default LogIn;
