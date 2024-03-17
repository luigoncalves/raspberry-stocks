import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn, logoutUser, user, search, setSearch } =
    useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      navigate(`/search/${search}`);
      onClose();
    } catch (error) {
      console.log('Error searching', error);
    }
  };

  return (
    <Flex
      as='nav'
      position='fixed'
      top={0}
      left={0}
      right={0}
      zIndex={999}
      bg='white'
      boxShadow='md'
      h='50px'
      p={4}
      justifyContent='space-evenly'
      alignItems='center'
    >
      <ChakraLink as={ReactRouterLink} to={'/'} color='green'>
        Home
      </ChakraLink>

      {isLoggedIn && (
        <>
          <ChakraLink as={ReactRouterLink} to={'/investorcenter'}>
            Investor Center
          </ChakraLink>

          <ChakraLink as={ReactRouterLink} to={'/watchlist'}>
            Watch List
          </ChakraLink>
        </>
      )}
      {/* <ChakraLink as={ReactRouterLink} to={'/search'}>
        Search
      </ChakraLink> */}

      <Button colorScheme='blue' onClick={onOpen}>
        Search
      </Button>
      <Drawer placement='top' onClose={onClose} isOpen={isOpen} size='xs'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Search by ticker symbol or company name
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit}>
              <label></label>
              <input
                type='search'
                name='search'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              <button type='submit'>Search</button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {!isLoggedIn ? (
        <ChakraLink as={ReactRouterLink} to={'/login'}>
          Log In
        </ChakraLink>
      ) : (
        <ChakraLink as={ReactRouterLink} to={`/profile/${user.name}`}>
          My Profile
        </ChakraLink>
      )}
    </Flex>
  );
}

export default Navbar;
