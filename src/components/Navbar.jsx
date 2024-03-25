import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import { useState } from 'react';
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
  Box,
  Image,
} from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn, logoutUser, user, search, setSearch } =
    useContext(AuthContext);

  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogInOpen = () => setIsLogInOpen(true);
  const handleLogInClose = () => setIsLogInOpen(false);
  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);

  // --------------------------------------   handle Search button

  const handleSearchSubmit = async e => {
    e.preventDefault();

    try {
      navigate(`/search/${search}`);
      handleSearchClose();
      setSearch('');
    } catch (error) {
      console.log('Error searching', error);
    }
  };

  // -------------------------------------  handle Log In button

  const handleLogInSubmit = async () => {
    try {
      handleLogInClose();
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
      h='70px'
      p={4}
      justifyContent='space-between'
      alignItems='center'
      paddingLeft='2rem'
      paddingRight='2rem'
    >
      <ChakraLink as={ReactRouterLink} to={'/'}>
        <Flex>
          <Image
            src={'/logo.png'}
            fallbackSrc=''
            alt='Home'
            width='2rem'
            height='auto'
            marginRight='2rem'
            borderRadius='md'
          />
        </Flex>
      </ChakraLink>

      <Flex alignItems='center' justifyContent='space-evenly'>
        {/*  ---------------------------------------  search Button  ---------------------------- */}

        <Button
          onClick={handleSearchOpen}
          boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
          height='2rem'
          p='1.2rem'
          margin='1rem'
          _hover={{ bg: 'rgba(15, 22, 97, 1)', color: 'gray.100' }}
        >
          <IoSearchOutline size={20} />
        </Button>
        <Drawer
          placement='top'
          onClose={handleSearchClose}
          isOpen={isSearchOpen}
          size='xs'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              borderBottomWidth='1px'
              color='rgba(220, 14, 117, 0.9)'
            >
              Search by ticker symbol or company name
            </DrawerHeader>
            <DrawerBody>
              <form onSubmit={handleSearchSubmit}>
                <label></label>
                <input
                  type='search'
                  name='search'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    padding: '0.3rem',
                    border: '1px solid rgba(15, 22, 97, 1)',
                    borderRadius: '0.3rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                  }}
                />

                <button
                  type='submit'
                  style={{
                    backgroundColor: 'rgba(15, 22, 97, 1)',
                    color: 'white',
                    padding: '0.3rem',
                    borderRadius: '0.3rem',
                  }}
                >
                  Search
                </button>
              </form>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {isLoggedIn && (
          <>
            {/* <ChakraLink as={ReactRouterLink} to={'/investorcenter'}>
            Investor Center
          </ChakraLink> */}

            <ChakraLink
              as={ReactRouterLink}
              to={'/watchlist'}
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                display='flex'
                alignItems='center'
                height='2rem'
                // border='2px solid rgba(15, 22, 97, 1)'
                color='rgba(15, 22, 97, 1)'
                bg='gray.100'
                fontSize='lg'
                p='1.2rem'
                margin='1rem'
                borderRadius='md'
                boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
                _hover={{ bg: 'rgba(15, 22, 97, 1)', color: 'gray.100' }}
              >
                Watchlist
              </Box>
            </ChakraLink>
          </>
        )}
        {/*   ----------------------------------------    log in button   ------------------------------ */}

        {!isLoggedIn ? (
          <Flex alignItems='center' height='100%' width='max-content'>
            <ChakraLink
              as={ReactRouterLink}
              to={'/login'}
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                display='flex'
                alignItems='center'
                height='2rem'
                // border='2px solid rgba(15, 22, 97, 1)'
                color='rgba(15, 22, 97, 1)'
                bg='gray.100'
                fontSize='lg'
                p='1.2rem'
                margin='1rem'
                borderRadius='md'
                boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
                _hover={{ bg: 'rgba(15, 22, 97, 1)', color: 'gray.100' }}
              >
                Log In
              </Box>
            </ChakraLink>

            {/*   ----------------------------------------    sign up button   ------------------------------ */}

            <ChakraLink
              as={ReactRouterLink}
              to={'/signup'}
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                display='flex'
                alignItems='center'
                height='2rem'
                // border='2px solid rgba(15, 22, 97, 1)'
                bg='rgba(15, 22, 97, 1)'
                color='gray.100'
                fontSize='lg'
                p='1.2rem'
                margin='1rem'
                borderRadius='md'
                boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
                _hover={{ color: 'rgba(15, 22, 97, 1)', bg: 'gray.100' }}
              >
                Sign Up
              </Box>
            </ChakraLink>
          </Flex>
        ) : (
          //   --------------------------------   My Profile button  ------------------------------

          <ChakraLink
            as={ReactRouterLink}
            to={`/profile/${user.name}`}
            _hover={{ textDecoration: 'none' }}
          >
            <Box
              display='flex'
              alignItems='center'
              height='2rem'
              color='rgba(15, 22, 97, 1)'
              bg='gray.100'
              fontSize='lg'
              p='1.2rem'
              margin='1rem'
              borderRadius='md'
              boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
              _hover={{ bg: 'rgba(15, 22, 97, 1)', color: 'gray.100' }}
            >
              My Profile
            </Box>
          </ChakraLink>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
