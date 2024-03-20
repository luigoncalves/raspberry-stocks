import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
import { addItem, getAllUserItems } from '../api/item.api';
const apiKey = `${import.meta.env.VITE_API_KEY}`;

function StockPage() {
  const { stockTicker } = useParams();
  const [stockInfo, setStockInfo] = useState([]);
  const [stockQuote, setStockQuote] = useState([]);
  const [similarStocks, setSimilarStocks] = useState([]);
  const [addButton, setAddButton] = useState(true);
  const { isLoggedIn, user } = useContext(AuthContext);

  const getStockInfo = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/profile/${stockTicker}?apikey=${apiKey}`
      );
      console.log(response.data);
      setStockInfo(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getStockQuote = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${stockTicker}?apikey=${apiKey}`
      );
      console.log(response.data);
      setStockQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarStocks = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
      );
      console.log(response.data);
      setStockQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------  add item to the Watchlist

  const addToWatchList = async () => {
    const itemToAdd = {
      title: stockInfo.companyName,
      tickerSymbol: stockInfo.symbol,
      typeOfAsset: 'stock',
      userId: user._id,
    };
    await addItem(itemToAdd);
    setAddButton(false);
  };

  // ------------------------------------ check if the item is already in the Watchlist

  const checkWatchList = async () => {
    try {
      const response = await getAllUserItems(user);
      console.log('this is the watchList:', response.data);
      const check = await response.data.some(
        item => item.tickerSymbol === stockTicker
      );
      setAddButton(!check);
      console.log('check', check);
      console.log('inside checkwatchlist', addButton);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockInfo(stockTicker);
    getStockQuote(stockTicker);
  }, []);

  // ------------------------------- everytime the button is clicked this runs

  useEffect(() => {
    if (user) {
      checkWatchList();
      console.log(addButton);
    }
  }, [addButton]);

  return (
    <Grid
      templateAreas={`"header header"
              "main commod"
             `}
      gridTemplateRows={'300px 1fr'}
      gridTemplateColumns={'3fr 1fr'}
      minHeight='100vh'
      h='maxContent'
      w='100vw'
      justifyContent='center'
      paddingBottom='2rem'
      gap='5'
      color='blackAlpha.800'
      fontWeight='bold'
    >
      <GridItem
        pl='2'
        bg='rgba(15, 22, 97, 1)'
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
        area={'header'}
        display='flex'
        alignItems='center'
      >
        <Flex marginLeft='3rem'>
          <Image
            src={stockInfo.image}
            fallbackSrc=' '
            alt=''
            width='160px'
            height='auto'
            marginRight='2rem'
            borderRadius='md'
          />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
          >
            <Heading
              as='h3'
              size='xl'
              color='gray.100'
              w='max-content'
              noOfLines={1}
            >
              {stockInfo.companyName}
            </Heading>
            <Text
              color='gray'
              border='1px solid gray'
              marginTop='1rem'
              borderRadius='md'
              w='max-content'
              padding='0.4rem'
            >
              {`${stockInfo.symbol} | ${stockInfo.exchangeShortName}`}
            </Text>
            {/* {isLoggedIn && (
              <Text>
                {addButton && (
                  <button onClick={addToWatchList}>Add to Watchlist</button>
                )}
              </Text>
            )} */}
            <Flex marginTop='1rem' color='gray.100' alignItems='end'>
              <Text fontSize='xl'>{stockInfo.price}</Text>
              <Text marginLeft='0.3rem' marginBottom='0.2rem' fontSize='xs'>
                {stockInfo.currency}
              </Text>

              {stockQuote.changesPercentage > 0 ? (
                <Text
                  fontSize='md'
                  color='green.400'
                  marginLeft='5'
                  marginBottom='0.1rem'
                >
                  {`+ ${stockQuote.change} (+ ${stockQuote.changesPercentage}%)`}
                </Text>
              ) : (
                <Text fontSize='md' color='red.500' marginLeft='5'>
                  {` ${stockQuote.change} (${stockQuote.changesPercentage}%)`}
                </Text>
              )}
            </Flex>
          </Box>
        </Flex>
        {isLoggedIn && addButton && (
          <Button
            display='flex'
            borderRadius='md'
            border='1px solid rgba(220, 14, 117, 0.9)'
            w='8rem'
            h='2rem'
            alignItems='center'
            justifyContent='center'
            alignSelf='start'
            marginTop='5rem'
            marginLeft='1rem'
            fontSize='sm'
            color='rgba(220, 14, 117, 0.9)'
            _hover={{ bg: 'rgba(220, 14, 117, 0.9)', color: 'gray.100' }}
            variant='outline'
            onClick={addToWatchList}
          >
            Add to Watchlist
          </Button>
        )}
        {isLoggedIn && !addButton && (
          <Box
            display='flex'
            borderRadius='md'
            border='1px solid gray'
            w='8rem'
            h='2rem'
            alignItems='center'
            justifyContent='center'
            alignSelf='start'
            marginTop='5rem'
            marginLeft='1rem'
            fontSize='sm'
            color='gray'
          >
            Add to Watchlist
          </Box>
        )}
      </GridItem>
      <GridItem pl='2' area={'main'}>
        {/* ------------- second grid inside the main component ---------------- */}
        <Grid
          templateAreas={`"info info"
              "summary historic"
             `}
          gridTemplateRows={'1fr 1fr'}
          gridTemplateColumns={'1fr 1fr'}
          h='maxContent'
          w='maxContent'
          justifyContent='center'
          gap='4'
          color='blackAlpha.700'
          marginLeft='1rem'
        >
          <GridItem
            pl='2'
            bg='gray.100'
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
            area={'info'}
            display='flex'
            flexDirection='column'
            alignItems='start'
            justifyContent='start'
            borderRadius='md'
          >
            <Heading as='h3' size='md'>
              About
            </Heading>
            <Flex>
              <Box>
                <TableContainer>
                  <Table size='sm'>
                    <Thead>
                      <Tr>
                        <Th>CEO</Th>
                        <Th>Sector</Th>
                        <Th>Industry</Th>
                        <Th>Website</Th>
                        <Th>Exchange</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>{stockInfo.ceo}</Td>
                        <Td>{stockInfo.sector}</Td>
                        <Td>{stockInfo.industry}</Td>
                        <Td>{stockInfo.website}</Td>
                        <Td>{stockInfo.exchangeShortName}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Heading as='h3' size='sm'>
                  Description
                </Heading>
                <Text fontSize='xs'>{stockInfo.description}</Text>
              </Box>
              <Box>
                <TableContainer>
                  <Table size='sm'>
                    <Tbody>
                      <Tr>
                        <Th>CIK</Th>
                        <Td>{stockInfo.cik}</Td>
                      </Tr>
                      <Tr>
                        <Th>ISIN</Th>
                        <Td>{stockInfo.isin}</Td>
                      </Tr>
                      <Tr>
                        <Th>CUSIP</Th>
                        <Td>{stockInfo.cusip}</Td>
                      </Tr>
                      <Tr>
                        <Th>Address</Th>
                        <Td>{stockInfo.address}</Td>
                      </Tr>
                      <Tr>
                        <Th>Phone</Th>
                        <Td>{stockInfo.phone}</Td>
                      </Tr>
                      <Tr>
                        <Th>Country</Th>
                        <Td>{stockInfo.country}</Td>
                      </Tr>
                      <Tr>
                        <Th>Employee</Th>
                        <Td>{stockInfo.fullTimeEmployees}</Td>
                      </Tr>
                      <Tr>
                        <Th>IPO Date</Th>
                        <Td>{stockInfo.ipoDate}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </GridItem>
          <GridItem
            pl='2'
            bg='gray.100'
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
            area={'summary'}
            borderRadius='md'
          ></GridItem>
          <GridItem
            pl='2'
            bg='gray.100'
            area={'historic'}
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
            borderRadius='md'
          ></GridItem>
        </Grid>
      </GridItem>
      <GridItem
        pl='2'
        bg='green.300'
        marginRight='1rem'
        area={'commod'}
        borderRadius='md'
      >
        <Heading>Latest {stockInfo.symbol} News</Heading>
      </GridItem>
    </Grid>
  );
}

export default StockPage;
