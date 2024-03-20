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
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);
  const [stockInfo, setStockInfo] = useState([]);
  const [userStocks, setUserStocks] = useState([]);
  const [updateDelete, setUpdateDelete] = useState(false);

  //  ---------- gets the stocks from the database for the specific user

  const getWatchlist = async () => {
    try {
      const response = await getAllUserItems(user);
      console.log('this is the watchList:', response.data);
      setUserStocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------- this takes the array from getWatchList and makes a request for each item for its info

  const getStocksInfo = async () => {
    console.log('This is userStocks:', userStocks);

    try {
      const promises = userStocks.map(async userStock => {
        // --------------------------------------------------------if the item is a stock
        if (userStock.typeOfAsset === 'stock') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/profile/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          return response.data[0];
        }

        // --------------------------------------------------------if the item is a commodity
        else if (userStock.typeOfAsset === 'commodity') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          return response.data[0];
        }

        // --------------------------------------------------------if the item is a forex
        else if (userStock.typeOfAsset === 'forex') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          return response.data[0];
        }

        // --------------------------------------------------------if the item is crypto
        else if (userStock.typeOfAsset === 'crypto') {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${userStock.tickerSymbol}?apikey=${apiKey}`
          );
          console.log('Individual stock response:', response.data[0]);
          response.data[0]._id = userStock._id;
          return response.data[0];
        }
      });

      const promisesArray = await Promise.all(promises);
      setStockInfo(promisesArray);

      console.log('This is promisesArray:', promisesArray);
      console.log('This is stockInfo:', stockInfo);
    } catch (error) {}
  };

  // --------- everytime the page loads, it will get the updated watchlist from the backend

  useEffect(() => {
    const functionToRun = async () => {
      if (isLoggedIn && user) {
        console.log(user);
        await getWatchlist();
      }
    };
    console.log(user);
    console.log(isLoggedIn);
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
    <Flex width='100vw' flexDirection='column' justifyContent='center'>
      <h1>Watch List</h1>

      {isLoggedIn && (
        <TableContainer width='70vw'>
          <Table size='md'>
            <Thead>
              <Tr>
                <Th>Symbol</Th>
                <Th>Company Name</Th>
                <Th>Price</Th>
                <Th>Change</Th>
                <Th>Currency</Th>
                <Th>Market</Th>
                <Th>Volume</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {stockInfo.map(stock => {
                return (
                  <Tr key={stock._id}>
                    <Td>{stock.symbol}</Td>
                    <Td>{stock.companyName}</Td>
                    <Td>{stock.price}</Td>
                    <Td>{stock.changes}</Td>
                    <Td>{stock.currency}</Td>
                    <Td>{stock.exchangeShortName}</Td>
                    <Td>{stock.volAvg}</Td>
                    <Td>
                      <button
                        onClick={() => deleteItemFromWatchList(stock._id)}
                      >
                        Remove
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
}

export default WatchList;
