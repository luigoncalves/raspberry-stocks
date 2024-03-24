import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { login } from '../api/auth.api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {
  Button,
  Box,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
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
      bg='gray.100'
    >
      <Flex
        flexDirection='column'
        width='30rem'
        height='max-content'
        alignItems='center'
        justifyContent='center'
        boxShadow='0px 2px 2px rgba(15, 22, 97, 1)'
        borderRadius='md'
        bg='white'
      >
        <Heading
          marginBottom='2rem'
          marginTop='2rem'
          color='rgba(15, 22, 97, 1)'
        >
          Log In
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl w='20rem'>
            <FormLabel color='rgba(15, 22, 97, 1)'>Email address</FormLabel>
            <Input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              borderColor='rgba(15, 22, 97, 1)'
              _focus={{
                borderColor: 'rgba(15, 22, 97, 1)',
                outline: 'none',
              }}
              marginBottom='1rem'
            />

            <FormLabel color='rgba(15, 22, 97, 1)'>Password</FormLabel>
            <Input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              borderColor='rgba(15, 22, 97, 1)'
              _focus={{
                borderColor: 'rgba(15, 22, 97, 1)',
                outline: 'none',
              }}
              marginBottom='1rem'
            />
          </FormControl>

          <Button
            mt={4}
            color='gray.100'
            border='1px solid rgba(220, 14, 117, 0.9)'
            bg='rgba(220, 14, 117, 0.9)'
            _hover={{ bg: 'white', color: 'rgba(220, 14, 117, 0.9)' }}
            type='submit'
          >
            Submit
          </Button>
        </form>

        {error && (
          <Text color='rgba(220, 14, 117, 0.9)' mt='1rem'>
            {error}
          </Text>
        )}
        <Text
          color='rgba(15, 22, 97, 1)'
          fontSize='md'
          marginTop='2rem'
          p='1rem'
        >
          Don't have an account?
        </Text>

        <ChakraLink
          as={ReactRouterLink}
          to={'/signup'}
          marginBottom='1rem'
          borderRadius='md'
          p='0.2rem'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            color='rgba(220, 14, 117, 0.9)'
            fontSize='md'
            _hover={{
              color: 'rgba(220, 14, 117, 0.6)',
            }}
          >
            Sign Up
          </Text>
        </ChakraLink>
      </Flex>
    </Flex>
  );
}

export default LogIn;
