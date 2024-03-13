import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
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
      <ChakraLink as={ReactRouterLink} to={'/search'}>
        Search
      </ChakraLink>

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
