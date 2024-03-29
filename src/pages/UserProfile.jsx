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
  Icon,
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDisclosure } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { deleteUser } from '../api/auth.api';

function UserProfile() {
  const { isLoggedIn, logoutUser, user, authenticateUser } =
    useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();

  const navigate = useNavigate();

  const logTheUserOut = async () => {
    await logoutUser();
    navigate('/');
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const toggleDelete = async () => {
    // console.log(user);
    await deleteUser(user);
    onClose;
    authenticateUser();
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
          maxW='max-content'
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
              <MenuButton
                as={Button}
                bg='rgba(15, 22, 97, 1)'
                color='gray.100'
                _hover={{ color: 'rgba(15, 22, 97, 1)', bg: 'gray.100' }}
              >
                <Flex>
                  Edit Profile
                  <Icon
                    as={IoIosArrowDown}
                    w={5}
                    h={5}
                    color='gray.100'
                    marginLeft='0.5rem'
                  />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={handleGoToChangeUsername}
                  color='rgba(15, 22, 97, 1)'
                >
                  Change username
                </MenuItem>
                <MenuItem
                  onClick={handleGoToChangePassword}
                  color='rgba(15, 22, 97, 1)'
                >
                  Change password
                </MenuItem>
              </MenuList>
            </Menu>

            <Button
              variant='ghost'
              bg='rgba(15, 22, 97, 1)'
              color='gray.100'
              _hover={{ color: 'rgba(15, 22, 97, 1)', bg: 'gray.100' }}
              onClick={onOpen}
              marginLeft='1rem'
            >
              Delete Profile
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Account
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete your account? You can't undo
                    this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      onClick={onClose}
                      _hover={{ color: 'rgba(220, 14, 117, 0.9)' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg='rgba(220, 14, 117, 0.9)'
                      color='gray.100'
                      onClick={toggleDelete}
                      ml={3}
                      _hover={{
                        bg: 'gray.100',
                        color: 'rgba(220, 14, 117, 0.9)',
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            <Button
              variant='ghost'
              colorScheme='blue'
              onClick={logTheUserOut}
              bg='rgba(15, 22, 97, 1)'
              color='gray.100'
              _hover={{ color: 'rgba(15, 22, 97, 1)', bg: 'gray.100' }}
              marginLeft='1rem'
            >
              Log Out
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
}

export default UserProfile;
