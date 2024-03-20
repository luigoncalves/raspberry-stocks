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
import { addItem } from '../api/item.api';
const apiKey = `${import.meta.env.VITE_API_KEY}`;

function ForexPage() {
  const { forexTicker } = useParams();
  const [forexInfo, setForexInfo] = useState([]);
  const [forexQuote, setForexQuote] = useState([]);
  const [similarForex, setSimilarForex] = useState([]);
  const [addButton, setAddButton] = useState(true);
  const { isLoggedIn, user } = useContext(AuthContext);

  // const getForexInfo = async symbol => {
  //   try {
  //     const response = await axios.get(
  //       `https://financialmodelingprep.com/api/v3/symbol/available-forex-currency-pairs?apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
  //     );
  //     console.log(response.data);
  //     setForexInfo(response.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getForexQuote = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
      );
      console.log(response.data);
      setForexQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarForex = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
      );
      console.log(response.data);
      setForexQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToWatchList = async () => {
    const itemToAdd = {
      title: forexInfo.companyName,
      tickerSymbol: forexInfo.symbol,
      typeOfAsset: 'forex',
      userId: user._id,
    };
    await addItem(itemToAdd);
    setAddButton(false);
  };

  useEffect(() => {
    // getForexInfo(forexTicker);
    getForexQuote(forexTicker);
  }, []);

  return (
    <Grid
      templateAreas={`"header header"
              "main commod"
             `}
      gridTemplateRows={'280px 1fr'}
      gridTemplateColumns={'4fr 1fr'}
      minHeight='100vh'
      h='maxContent'
      w='100vw'
      justifyContent='center'
      gap='1'
      color='blackAlpha.800'
      fontWeight='bold'
    >
      <GridItem
        pl='2'
        bg='orange.300'
        area={'header'}
        display='flex'
        alignItems='center'
      >
        <Flex border='1px solid black'>
          <Image
            src={forexQuote.image}
            fallbackSrc=' '
            alt=''
            width='150px'
            height='auto'
          />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
          >
            <Heading as='h3' size='md' noOfLines={1}>
              {forexQuote.companyName}
            </Heading>
            <Text>
              {forexQuote.symbol} | {forexQuote.exchangeShortName}
            </Text>
            {isLoggedIn && (
              <Text>
                {addButton && (
                  <button onClick={addToWatchList}>Add to Watchlist</button>
                )}
              </Text>
            )}
            <Box>
              {forexQuote.price} {forexQuote.currency}{' '}
              {forexQuote.changesPercentage > 0 ? (
                <Text color='green.500' marginLeft='5'>
                  {`+ ${forexQuote.change} (+ ${forexQuote.changesPercentage}%)`}
                </Text>
              ) : (
                <Text color='red.500' marginLeft='5'>
                  {` ${forexQuote.change} (${forexQuote.changesPercentage}%)`}
                </Text>
              )}
            </Box>
          </Box>
        </Flex>
      </GridItem>
      <GridItem pl='2' bg='pink.300' area={'main'}>
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
          gap='1'
          color='blackAlpha.700'
        >
          <GridItem
            pl='2'
            bg='orange.300'
            area={'info'}
            display='flex'
            flexDirection='column'
            alignItems='start'
            justifyContent='start'
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
                        <Td>{forexInfo.ceo}</Td>
                        <Td>{forexInfo.sector}</Td>
                        <Td>{forexInfo.industry}</Td>
                        <Td>{forexInfo.website}</Td>
                        <Td>{forexInfo.exchangeShortName}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Heading as='h3' size='sm'>
                  Description
                </Heading>
                <Text fontSize='xs'>{forexInfo.description}</Text>
              </Box>
              <Box>
                <TableContainer>
                  <Table size='sm'>
                    <Tbody>
                      <Tr>
                        <Th>CIK</Th>
                        <Td>{forexInfo.cik}</Td>
                      </Tr>
                      <Tr>
                        <Th>ISIN</Th>
                        <Td>{forexInfo.isin}</Td>
                      </Tr>
                      <Tr>
                        <Th>CUSIP</Th>
                        <Td>{forexInfo.cusip}</Td>
                      </Tr>
                      <Tr>
                        <Th>Address</Th>
                        <Td>{forexInfo.address}</Td>
                      </Tr>
                      <Tr>
                        <Th>Phone</Th>
                        <Td>{forexInfo.phone}</Td>
                      </Tr>
                      <Tr>
                        <Th>Country</Th>
                        <Td>{forexInfo.country}</Td>
                      </Tr>
                      <Tr>
                        <Th>Employee</Th>
                        <Td>{forexInfo.fullTimeEmployees}</Td>
                      </Tr>
                      <Tr>
                        <Th>IPO Date</Th>
                        <Td>{forexInfo.ipoDate}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </GridItem>
          <GridItem pl='2' bg='pink.300' area={'summary'}></GridItem>
          <GridItem pl='2' bg='green.300' area={'historic'}></GridItem>
        </Grid>
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'commod'}></GridItem>
    </Grid>
  );
}

export default ForexPage;
