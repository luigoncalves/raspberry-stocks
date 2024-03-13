import { Link as ChakraLink } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  Image,
  Heading,
  Divider,
  Spacer,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { deleteUser } from '../api/auth.api';

function UserProfile() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  const logTheUserOut = async () => {
    await logoutUser();
    navigate('/');
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const toggleDelete = async () => {
    console.log(user);
    await deleteUser(user);
    navigate('/');
  };

  return (
    <>
      {isLoggedIn && (
        <Flex flexDirection='column' justifyContent='center'>
          <p>{user.name}</p>
          <p>{user.email}</p>

          <Flex>
            <button onClick={toggleEdit}>Edit Profile</button>
            {edit && (
              <Flex>
                <ChakraLink as={ReactRouterLink} to={'/changeUsername'}>
                  Change Username
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to={'/changePassword'}>
                  Change Password
                </ChakraLink>
              </Flex>
            )}
            <button onClick={toggleDelete}>Delete Profile</button>
          </Flex>

          <ChakraLink>
            <button onClick={logTheUserOut}>Log Out</button>
          </ChakraLink>
        </Flex>
      )}
    </>
  );
}

export default UserProfile;
