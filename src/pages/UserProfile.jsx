import { Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
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
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { deleteUser } from '../api/auth.api';

function UserProfile() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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

  const handleGoToChangeUsername = async () => {
    navigate('/changeUsername');
  };
  const handleGoToChangePassword = async () => {
    navigate('/changePassword');
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
        padding='3rem'
        alignItems='center'
        justifyContent='start'
        boxShadow='0px 2px 2px rgba(15, 22, 97, 1)'
        borderRadius='md'
        bg='white'
      >
        <Card
          maxW='sm'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='start'
          shadow='none'
        >
          <CardBody
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            width='100%'
          >
            <Image
              src='/logo.png'
              alt='user avatar'
              borderRadius='lg'
              width='5rem'
            />
            <Stack
              mt='6'
              spacing='3'
              display='flex'
              alignItems='start'
              width='100%'
            >
              <Heading size='lg' color='rgba(220, 14, 117, 0.9)'>
                Username
              </Heading>
              <Text color='rgba(15, 22, 97, 1)' fontSize='lg'>
                {user.name}
              </Text>
              <Heading size='lg' color='rgba(220, 14, 117, 0.9)'>
                Email
              </Heading>
              <Text fontSize='lg'>{user.email}</Text>
            </Stack>
          </CardBody>

          <Divider />

          <CardFooter>
            <Menu>
              <MenuButton as={Button}>Edit Profile</MenuButton>
              <MenuList>
                <MenuItem onClick={handleGoToChangeUsername}>
                  Edit username
                </MenuItem>
                <MenuItem onClick={handleGoToChangePassword}>
                  Change password
                </MenuItem>
              </MenuList>
            </Menu>

            <Button variant='ghost' colorScheme='blue' onClick={toggleDelete}>
              Delete Profile
            </Button>
          </CardFooter>
        </Card>

        {isLoggedIn && (
          <Flex flexDirection='column' justifyContent='start'>
            <Heading textAlign='left' fontSize='3xl'>
              Username:
            </Heading>
            <Text textAlign='left'>{user.name}</Text>
            <Heading textAlign='left' fontSize='3xl'>
              Email:
            </Heading>
            <Text textAlign='left'>{user.email}</Text>

            <Flex justifyContent='start'>
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

            <ChakraLink textAlign='left'>
              <button onClick={logTheUserOut}>Log Out</button>
            </ChakraLink>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default UserProfile;
