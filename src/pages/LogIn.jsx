import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {
  Flex,
  Button,
  Box,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <Flex
      flexDirection='column'
      height='100vh'
      width='100vw'
      alignItems='center'
      justifyContent='center'
    >
      <Flex
        flexDirection='column'
        width='30rem'
        height='30rem'
        alignItems='center'
        justifyContent='center'
        border='2px solid rgba(15, 22, 97, 1)'
        borderRadius='md'
      >
        <Heading marginBottom='2rem' color='rgba(15, 22, 97, 1)'>
          Log In
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl w='20rem'>
            <FormLabel color='rgba(15, 22, 97, 1)'>Email address</FormLabel>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              marginBottom='1rem'
            />

            <FormLabel color='rgba(15, 22, 97, 1)'>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              marginBottom='1rem'
            />
          </FormControl>

          <Button
            mt={4}
            color='gray.100'
            style={{
              backgroundColor: 'rgba(220, 14, 117, 0.9)',
            }}
            type='submit'
          >
            Submit
          </Button>
        </form>

        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
        {error && <p>{error}</p>}

        <p>Don't have an account?</p>
        <Link to={'/signup'}>Sign Up</Link>
      </Flex>
    </Flex>
  );
}

export default LogIn;
