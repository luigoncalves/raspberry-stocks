import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
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

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password, name };

    try {
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signing up', error);
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
        border='1px solid black'
        borderRadius='md'
      >
        <Heading marginBottom='2rem' color='rgba(15, 22, 97, 1)'>
          Sign Up
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
            <FormLabel color='rgba(15, 22, 97, 1)'>Name</FormLabel>
            <Input
              type='text'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
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
            Sign Up
          </Button>
        </form>
        {error && <p>{error}</p>}

        <p>Already have an account?</p>

        <Link to={'/login'}>Log In</Link>
      </Flex>
    </Flex>
  );
}

export default SignUp;
