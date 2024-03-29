import { changeUsername } from '../api/auth.api';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Box,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

function ChangeUsername() {
  const [password, setPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const changedUser = { newName, password, userId: user._id };

    // console.log(changedUser);

    try {
      const response = await changeUsername(changedUser);
      authenticateUser();
      // console.log('Response:', response);
      navigate(`/profile/${user.name}`);
    } catch (error) {
      console.log('Error chnaging the username', error);

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
          Change your Username
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl w='20rem'>
            <FormLabel color='rgba(15, 22, 97, 1)'>New username</FormLabel>
            <Input
              id='newName'
              type='name'
              name='newName'
              value={newName}
              onChange={e => setNewName(e.target.value)}
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
            mt={2}
            color='gray.100'
            border='1px solid rgba(220, 14, 117, 0.9)'
            bg='rgba(220, 14, 117, 0.9)'
            _hover={{ bg: 'white', color: 'rgba(220, 14, 117, 0.9)' }}
            marginBottom='1rem'
            type='submit'
          >
            Confirm
          </Button>
        </form>

        {error && (
          <Text color='rgba(220, 14, 117, 0.9)' mb='1rem' p='1rem'>
            {error}
          </Text>
        )}

        <Flex w='100%' marginLeft='3rem' marginBottom='1rem'>
          <ChakraLink
            as={ReactRouterLink}
            to={`/profile/${user.name}`}
            color='rgba(15, 22, 97, 1)'
          >
            Back
          </ChakraLink>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ChangeUsername;
