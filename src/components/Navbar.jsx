import { Stack, HStack, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <HStack spacing='78px'>
      <ChakraLink as={ReactRouterLink} to={'/'} color='green'>
        Home
      </ChakraLink>

      <ChakraLink as={ReactRouterLink} to={'/investorcenter'}>
        Investor Center
      </ChakraLink>

      <ChakraLink as={ReactRouterLink} to={'/watchlist'}>
        Watch List
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={'/search'}>
        Search
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={'/login'}>
        Log In
      </ChakraLink>
    </HStack>

    //   <Link to={'/'}>Home</Link>

    //   <Link to={'/investorcenter'}>Investor Center</Link>

    //   <Link to={'watchlist'}>Watch List</Link>

    //   <Link to={'/search'}>Search</Link>

    //   <Link to={'/login'}>Log in</Link>
  );
}

export default Navbar;
