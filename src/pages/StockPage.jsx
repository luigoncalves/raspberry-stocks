import { useEffect, useState } from 'react';
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

function StockPage() {
  const { stockTicker } = useParams();
  const [stockInfo, setStockInfo] = useState([]);
  const [stockQuote, setStockQuote] = useState([]);
  const [similarStocks, setSimilarStocks] = useState([]);

  const getStockInfo = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
      );
      console.log(response.data);
      setStockInfo(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getStockQuote = async symbol => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
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
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=bad27d0fe5c04662a21dd5d7ca55ba93`
      );
      console.log(response.data);
      setStockQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockInfo(stockTicker);
    getStockQuote(stockTicker);
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
            src={stockInfo.image}
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
              {stockInfo.companyName}
            </Heading>
            <Text>
              {stockInfo.symbol} | {stockInfo.exchangeShortName}
            </Text>
            <Text>
              {stockInfo.price} {stockInfo.currency}{' '}
              {stockQuote.changesPercentage > 0 ? (
                <Text color='green.500' marginLeft='5'>
                  {`+ ${stockQuote.change} (+ ${stockQuote.changesPercentage}%)`}
                </Text>
              ) : (
                <Text color='red.500' marginLeft='5'>
                  {` ${stockQuote.change} (${stockQuote.changesPercentage}%)`}
                </Text>
              )}
            </Text>
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
                        <Td>{stockInfo.ceo}</Td>
                        <Td>{stockInfo.sector}</Td>
                        <Td>{stockInfo.industry}</Td>
                        <Td>{stockInfo.website}</Td>
                        <Td>{stockInfo.exchangeShortName}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Text fontSize='xs'>
                  <Heading as='h3' size='sm'>
                    Description
                  </Heading>
                  {stockInfo.description}
                </Text>
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
          <GridItem pl='2' bg='pink.300' area={'summary'}></GridItem>
          <GridItem pl='2' bg='green.300' area={'historic'}></GridItem>
        </Grid>
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'commod'}></GridItem>
    </Grid>
  );
}

export default StockPage;
