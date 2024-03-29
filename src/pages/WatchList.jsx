import { useState, useEffect, useContext } from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import axios from 'axios';
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
  Button,
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
import { deleteItem, getAllUserItems } from '../api/item.api';
const apiKey = `${import.meta.env.VITE_API_KEY}`;

function WatchList() {
  const { isLoggedIn, user, authenticateUser, watchlist, setWatchlist } =
    useContext(AuthContext);
  // const [stockInfo, setStockInfo] = useState([]);
  const [userStocks, setUserStocks] = useState([]);
  const [updateDelete, setUpdateDelete] = useState(false);

  //  ---------- gets the stocks from the database for the specific user

  const getWatchlist = async () => {
    try {
      const response = await getAllUserItems(user);
      // console.log('this is the watchList:', response.data);
      setUserStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------- this takes the array from getWatchList and makes a request for each item for its info

  const getStocksInfo = async () => {
    // console.log('This is userStocks:', userStocks);

    try {
      const promises = userStocks.map(async userStock => {
        // --------------------------------------------------------if the item is a stock
        if (userStock.typeOfAsset === 'stock') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/profile/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          // console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          response.data[0].typeOfAssetURL = 'stocks';
          return response.data[0];
        }

        // --------------------------------------------------------if the item is a commodity
        else if (userStock.typeOfAsset === 'commodity') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          // console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          response.data[0].typeOfAssetURL = 'commodities';
          return response.data[0];
        }

        // --------------------------------------------------------if the item is a forex
        else if (userStock.typeOfAsset === 'forex') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          // console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          response.data[0].typeOfAssetURL = 'forex';
          return response.data[0];
        }

        // --------------------------------------------------------if the item is crypto
        else if (userStock.typeOfAsset === 'crypto') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          // console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          response.data[0].typeOfAssetURL = 'crypto';
          return response.data[0];
        }
      });

      const promisesArray = await Promise.all(promises);
      setWatchlist(promisesArray);

      // console.log('This is promisesArray:', promisesArray);
      // console.log('This is watchlist:', watchlist);
    } catch (error) {}
  };

  // --------- everytime the page loads, it will get the updated watchlist from the backend

  useEffect(() => {
    const functionToRun = async () => {
      if (isLoggedIn && user) {
        // console.log(user);
        await getWatchlist();
      }
    };
    // console.log(user);
    // console.log(isLoggedIn);
    functionToRun();
  }, [user, updateDelete]);

  // ------- only run the getStocksInfo after userStocks is modified

  useEffect(() => {
    const runData = async () => {
      await getStocksInfo();
    };
    if (userStocks) {
      runData();
    }
  }, [userStocks]);

  // -------- delete an item from the watchList

  const deleteItemFromWatchList = async itemId => {
    await deleteItem(itemId);
    setUpdateDelete(!updateDelete);
  };

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
        Watchlist
      </Heading>

      {watchlist.length > 0 ? (
        <TableContainer
          marginLeft='2.5rem'
          marginBottom='2.5rem'
          marginRight='2.5rem'
        >
          <Table size='md' width='100%'>
            <Thead>
              <Tr>
                <Th color='rgba(220, 14, 117, 0.9)'>Symbol</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Company Name</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Price</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Change</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Currency</Th>
                <Th color='rgba(220, 14, 117, 0.9)'>Market</Th>

                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {watchlist.map(stock => {
                return (
                  <Tr key={stock._id}>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/${stock.typeOfAssetURL}/${stock.symbol}`}
                      display='flex'
                      justifyContent='start'
                      color='rgba(15, 22, 97, 1)'
                    >
                      <Td>{stock.symbol}</Td>
                    </ChakraLink>

                    <Td color='rgba(15, 22, 97, 1)'>
                      {stock.companyName ? stock.companyName : stock.name}
                    </Td>
                    <Td color='rgba(15, 22, 97, 1)'>{stock.price}</Td>
                    <Td color='rgba(15, 22, 97, 1)'>
                      {stock.changes ? stock.changes : stock.change}
                    </Td>
                    <Td color='rgba(15, 22, 97, 1)'>
                      {stock.currency ? stock.currency : '-'}
                    </Td>
                    <Td color='rgba(15, 22, 97, 1)'>
                      {stock.exchangeShortName
                        ? stock.exchangeShortName
                        : stock.exchange}
                    </Td>

                    <Td>
                      <Button
                        color='gray.100'
                        border='1px solid rgba(220, 14, 117, 0.9)'
                        bg='rgba(220, 14, 117, 0.9)'
                        _hover={{
                          bg: 'white',
                          color: 'rgba(220, 14, 117, 0.9)',
                        }}
                        onClick={() => deleteItemFromWatchList(stock._id)}
                      >
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box marginLeft='2.5rem' marginBottom='2.5rem' marginRight='2.5rem'>
          <Text color='rgba(15, 22, 97, 1)'>
            Nothing to see here yet... but you can add your favorite stocks to
            this list.
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default WatchList;
