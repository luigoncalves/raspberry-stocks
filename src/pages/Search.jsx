import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Flex,
  Box,
  Text,
  Image,
  Heading,
  Button,
  Divider,
  Spacer,
  GridItem,
  Grid,
} from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { AuthContext } from '../context/auth.context';
const apiKey = `${import.meta.env.VITE_API_KEY}`;

function Search() {
  const [searchItems, setSearchItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(0);
  const [resultsLength, setResultsLength] = useState(0);
  const { isLoggedIn, user } = useContext(AuthContext);

  const { field } = useParams();

  const getSearchResults = async inputField => {
    try {
      const searchResponse = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${inputField}&apikey=${apiKey}`
      );
      // console.log('Look here:', searchResponse.data);
      setSearchItems(searchResponse.data);
      setResultsLength(searchResponse.data.length);
      setDisplayedItems(0);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreInfo = async () => {
    try {
      const itemsToProcess = searchItems.slice(
        displayedItems,
        displayedItems + 10
      );
      const promises = itemsToProcess.map(async item => {
        // ------------------------------------------------------    if the item is CRYPTO
        if (item.exchangeShortName === 'CRYPTO') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${item.symbol}?apikey=${apiKey}`
          );

          if (!response || !response.data || response.data.length === 0) {
            return item;
          }

          const cryptoInfo = response.data[0];

          item.price = cryptoInfo.price;
          item.changesPercentage = cryptoInfo.changesPercentage;
          item.change = cryptoInfo.change;
          item.route = 'crypto';

          return item;
        }

        // --------------------------------------------------------- if the item is COMMOD
        else if (item.exchangeShortName === 'COMMODITY') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${item.symbol}?apikey=${apiKey}`
          );

          if (!response || !response.data || response.data.length === 0) {
            return item;
          }

          const commodInfo = response.data[0];

          item.price = commodInfo.price;
          item.changesPercentage = commodInfo.changesPercentage;
          item.change = commodInfo.change;
          item.route = 'commodities';

          return item;
        }
        // ---------------------------------------------- if the item is FOREX
        else if (item.exchangeShortName === 'FOREX') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${item.symbol}?apikey=${apiKey}`
          );

          if (!response || !response.data || response.data.length === 0) {
            return item;
          }

          const forexInfo = response.data[0];

          item.price = forexInfo.price;
          item.changesPercentage = forexInfo.changesPercentage;
          item.change = forexInfo.change;
          item.route = 'forex';

          return item;
        }
        // -------------------------------------- if the item is STOCK
        else {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${item.symbol}?apikey=${apiKey}`
          );

          if (!response || !response.data || response.data.length === 0) {
            return item;
          }

          const stockInfo = response.data[0];

          // console.log('this is stock Info', stockInfo);

          item.price = stockInfo.price;
          item.changesPercentage = stockInfo.changesPercentage;
          item.change = stockInfo.change;
          item.route = 'stocks';

          return item;
        }
      });

      const updatedItems = await Promise.all(promises);

      setItemsToShow([...itemsToShow, ...updatedItems]);
      setDisplayedItems(displayedItems + 10);
      // console.log('this is displayed items', displayedItems);
      // console.log('this is updated items:', updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  // --------- run everytime the search field changes

  useEffect(() => {
    setItemsToShow([]);
    getSearchResults(field);
  }, [field]);

  // --------- run everytime the searchItems array is changed

  useEffect(() => {
    if (searchItems.length !== 0) {
      getMoreInfo();
    }
  }, [searchItems]);

  return (
    <Flex
      flexDirection='column'
      justifyContent='start'
      alignContent='center'
      width='100vw'
      height='auto'
      minH='100vh'
      bg='gray.100'
    >
      <Heading margin='2.5rem' textAlign='left' color='rgba(15, 22, 97, 1)'>
        Found {resultsLength} results for '{field}'
      </Heading>

      {resultsLength === 0 ? null : (
        <TableContainer
          marginLeft='2.5rem'
          marginBottom='2.5rem'
          marginRight='2.5rem'
        >
          <Table size='md' width='100%'>
            <Thead>
              <Tr>
                <Th color='rgba(220, 14, 117, 0.9)'>Symbol</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Name</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Price</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Change</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Market</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemsToShow.map(item => {
                return (
                  <Tr>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/${item.route}/${item.symbol}`}
                      display='flex'
                      justifyContent='start'
                      color='rgba(15, 22, 97, 1)'
                    >
                      <Td>{item.symbol ? item.symbol : '-'}</Td>
                    </ChakraLink>

                    <Td color='rgba(15, 22, 97, 1)'>
                      {item.name ? item.name : '-'}
                    </Td>
                    <Td color='rgba(15, 22, 97, 1)'>
                      {item.price ? item.price : '-'}
                    </Td>
                    <Td color='rgba(15, 22, 97, 1)'>
                      {item.change ? item.change : '-'}
                    </Td>
                    <Td color='rgba(15, 22, 97, 1)'>
                      {item.exchangeShortName}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {resultsLength > displayedItems && resultsLength !== 0 && (
        <Flex
          marginLeft='2.5rem'
          marginRight='2.5rem'
          marginBottom='2.5rem'
          alignItems='center'
          justifyContent='center'
        >
          <Button
            mt={2}
            color='gray.100'
            width='max-content'
            border='1px solid rgba(220, 14, 117, 0.9)'
            bg='rgba(220, 14, 117, 0.9)'
            _hover={{ bg: 'white', color: 'rgba(220, 14, 117, 0.9)' }}
            onClick={getMoreInfo}
          >
            See More
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default Search;
