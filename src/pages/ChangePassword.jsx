import { changeUserPassword } from '../api/auth.api';
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

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const newPasswordObject = {
      password,
      newPassword,
      newPasswordConfirm,
      userId: user._id,
    };

    console.log(newPassword);

    try {
      const response = await changeUserPassword(newPasswordObject);
      // authenticateUser();
      console.log('Response:', response);
      navigate(`/profile/${user.name}`);
    } catch (error) {
      console.log('Error chnaging the password', error);

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
          Change your Password
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl w='20rem'>
            <FormLabel color='rgba(15, 22, 97, 1)'>Current Password</FormLabel>
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
            <FormLabel color='rgba(15, 22, 97, 1)'>New Password</FormLabel>
            <Input
              id='newPassword'
              type='password'
              name='newPassword'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              borderColor='rgba(15, 22, 97, 1)'
              _focus={{
                borderColor: 'rgba(15, 22, 97, 1)',
                outline: 'none',
              }}
              marginBottom='1rem'
            />
            <FormLabel color='rgba(15, 22, 97, 1)'>
              Confirm New Password
            </FormLabel>
            <Input
              id='newPasswordConfirm'
              type='password'
              name='newPasswordConfirm'
              value={newPasswordConfirm}
              onChange={e => setNewPasswordConfirm(e.target.value)}
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
          <Text color='rgba(220, 14, 117, 0.9)' mt='1rem' mb='1rem' p='1rem'>
            {error}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export default ChangePassword;
