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

function CommodityPage() {
  const { commodTicker } = useParams();
  const [commodInfo, setCommodInfo] = useState([]);
  const [commodQuote, setCommodQuote] = useState([]);
  const [similarCommod, setSimilarCommod] = useState([]);
  const [addButton, setAddButton] = useState(true);
  const { isLoggedIn, user } = useContext(AuthContext);

  const getCommodInfo = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${symbol}&apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
      );
      console.log(response.data);
      setCommodInfo(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommodQuote = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
      );
      console.log(response.data);
      setCommodQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // const getSimilarCommod = async symbol => {
  //   try {
  //     const response = await axios.get(
  //       `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
  //     );
  //     console.log(response.data);
  //     setCommodQuote(response.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addToWatchList = async () => {
    const itemToAdd = {
      title: commodInfo.name,
      tickerSymbol: commodInfo.symbol,
      typeOfAsset: 'commodity',
      userId: user._id,
    };
    await addItem(itemToAdd);
    setAddButton(false);
  };

  useEffect(() => {
    getCommodInfo(commodTicker);
    getCommodQuote(commodTicker);
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
            src={commodInfo.image}
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
              {commodInfo.companyName}
            </Heading>
            <Text>
              {commodInfo.symbol} | {commodInfo.exchangeShortName}
            </Text>
            {isLoggedIn && (
              <Text>
                {addButton && (
                  <button onClick={addToWatchList}>Add to Watchlist</button>
                )}
              </Text>
            )}
            <Box>
              {commodInfo.price} {commodInfo.currency}{' '}
              {commodQuote.changesPercentage > 0 ? (
                <Text color='green.500' marginLeft='5'>
                  {`+ ${commodQuote.change} (+ ${commodQuote.changesPercentage}%)`}
                </Text>
              ) : (
                <Text color='red.500' marginLeft='5'>
                  {` ${commodQuote.change} (${commodQuote.changesPercentage}%)`}
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
                        <Td>{commodInfo.ceo}</Td>
                        <Td>{commodInfo.sector}</Td>
                        <Td>{commodInfo.industry}</Td>
                        <Td>{commodInfo.website}</Td>
                        <Td>{commodInfo.exchangeShortName}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Heading as='h3' size='sm'>
                  Description
                </Heading>
                <Text fontSize='xs'>{commodInfo.description}</Text>
              </Box>
              <Box>
                <TableContainer>
                  <Table size='sm'>
                    <Tbody>
                      <Tr>
                        <Th>CIK</Th>
                        <Td>{commodInfo.cik}</Td>
                      </Tr>
                      <Tr>
                        <Th>ISIN</Th>
                        <Td>{commodInfo.isin}</Td>
                      </Tr>
                      <Tr>
                        <Th>CUSIP</Th>
                        <Td>{commodInfo.cusip}</Td>
                      </Tr>
                      <Tr>
                        <Th>Address</Th>
                        <Td>{commodInfo.address}</Td>
                      </Tr>
                      <Tr>
                        <Th>Phone</Th>
                        <Td>{commodInfo.phone}</Td>
                      </Tr>
                      <Tr>
                        <Th>Country</Th>
                        <Td>{commodInfo.country}</Td>
                      </Tr>
                      <Tr>
                        <Th>Employee</Th>
                        <Td>{commodInfo.fullTimeEmployees}</Td>
                      </Tr>
                      <Tr>
                        <Th>IPO Date</Th>
                        <Td>{commodInfo.ipoDate}</Td>
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

export default CommodityPage;
