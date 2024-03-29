import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CustomTooltip } from '../components/CustomTooltip';
import axios from 'axios';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
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
  flexbox,
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

function CommodityPage() {
  const { commodTicker } = useParams();
  const [commodInfo, setCommodInfo] = useState([]);
  const [commodQuote, setCommodQuote] = useState([]);
  const [news, setNews] = useState([]);
  const [addButton, setAddButton] = useState(true);
  const [graphDate, setGraphDate] = useState('1Y');

  const gridItemRef = useRef(null);
  const [gridItemWidth, setGridItemWidth] = useState(0);
  const [gridItemHeight, setGridItemHeight] = useState(0);

  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [auxPrices, setAuxPrices] = useState([]);
  const [changes, setChanges] = useState([]);

  const { isLoggedIn, user } = useContext(AuthContext);

  const getCommodInfo = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${commodTicker}&exchange=COMMODITY&apikey=${apiKey}`
      );
      // console.log(response.data);
      setCommodInfo(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommodQuote = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${commodTicker}?apikey=${apiKey}`
      );
      // console.log(response.data);
      setCommodQuote(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------------------  get News for this specific Commod

  const getCommodNews = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v4/general_news?page=2&limit=5&apikey=${apiKey}`
      );

      setNews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------  add item to the Watchlist

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

  // ------------------------------------ check if the item is already in the Watchlist

  const checkWatchList = async () => {
    try {
      const response = await getAllUserItems(user);
      // console.log('this is the watchList:', response.data);
      const check = await response.data.some(
        item => item.tickerSymbol === commodTicker
      );
      setAddButton(!check);
      // console.log('check', check);
      // console.log('inside checkwatchlist', addButton);
    } catch (error) {
      console.log(error);
    }
  };

  // --------------------------- formats the marketCap number

  const formatNumber = number => {
    if (number >= 1e12) {
      return (number / 1e12).toFixed(2) + 'T';
    } else if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + 'B';
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + 'M';
    } else {
      return number.toString();
    }
  };

  // ---------------------------------------  this function will get the daily value of the stock for the last 5 years

  const getHistoricalData = async commodTicker => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${commodTicker}?apikey=${apiKey}`
      );
      // console.log('reponse here:', response.data.historical);
      const revertArray = response.data.historical.reverse();

      setHistoricalPrices(revertArray);

      // console.log('this is revertedarray', revertArray);
      // console.log('this is historicalPrices1', historicalPrices);
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------------------  choosing the time interval

  const chooseGraphDates = () => {
    if (graphDate === '5D') {
      setAuxPrices(historicalPrices.slice(-5));
    } else if (graphDate === '1M') {
      setAuxPrices(historicalPrices.slice(-20));
    } else if (graphDate === '3M') {
      setAuxPrices(historicalPrices.slice(-60));
    } else if (graphDate === '6M') {
      setAuxPrices(historicalPrices.slice(-120));
    } else if (graphDate === '1Y') {
      setAuxPrices(historicalPrices.slice(-240));
    } else if (graphDate === '5Y') {
      setAuxPrices(historicalPrices);
    }
    // if the variable comes as undefined, it's assumed as 1Y
    else {
      setAuxPrices(historicalPrices.slice(-240));
    }
  };

  const commodPriceChanges = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock-price-change/${commodTicker}?apikey=${apiKey}`
      );
      setChanges(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommodInfo(commodTicker);
    getCommodQuote(commodTicker);
    getCommodNews();
    getHistoricalData(commodTicker);
  }, []);

  // ------------------------------- everytime the button is clicked this runs

  useEffect(() => {
    if (user) {
      checkWatchList();
      // console.log(addButton);
    }
  }, [addButton]);

  // ------------------------ for the graph size

  useEffect(() => {
    const updateDimensions = () => {
      if (gridItemRef.current && graphDate) {
        const width = gridItemRef.current.offsetWidth;
        const height = gridItemRef.current.offsetHeight;
        setGridItemWidth(width);
        setGridItemHeight(height);
      }

      window.addEventListener('resize', updateDimensions);

      // Clean up by removing the event listener when component unmounts
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    };
    updateDimensions();
  }, [window.innerHeight, window.innerWidth]);

  useEffect(() => {
    getHistoricalData(commodTicker);

    // console.log('this is historicalPrices2', historicalPrices);
    // console.log('this is the time stamp:', graphDate);
  }, [graphDate, gridItemHeight, gridItemWidth]);

  useEffect(() => {
    // console.log('this is historicalPrices', historicalPrices);
    if (historicalPrices.length > 0 && graphDate) {
      chooseGraphDates();
      commodPriceChanges();
    }
  }, [historicalPrices]);

  return (
    <Grid
      templateAreas={`"header header header"
              "main main news"
              "summary historic news"
             `}
      gridTemplateRows={'25% min-content min-content'}
      gridTemplateColumns={'35% 35% 30%'}
      w='100vw'
      justifyContent='center'
      paddingBottom='2rem'
      overflowY='auto'
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
        <Flex marginLeft='3rem' justifyContent='flex-start'>
          <Image
            src={commodInfo.image}
            fallbackSrc='/commod-logo.webp'
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
              {commodInfo.name}
            </Heading>
            <Text
              color='gray'
              border='1px solid gray'
              marginTop='1rem'
              borderRadius='md'
              w='max-content'
              padding='0.4rem'
            >
              {`${commodInfo.symbol} | ${commodInfo.exchangeShortName}`}
            </Text>
            {/* {isLoggedIn && (
              <Text>
                {addButton && (
                  <button onClick={addToWatchList}>Add to Watchlist</button>
                )}
              </Text>
            )} */}
            <Flex marginTop='1rem' color='gray.100' alignItems='end'>
              <Text fontSize='xl'>{commodQuote.price}</Text>
              <Text marginLeft='0.3rem' marginBottom='0.2rem' fontSize='xs'>
                {commodInfo.currency}
              </Text>

              {commodQuote.changesPercentage > 0 ? (
                <Text
                  fontSize='md'
                  color='green.400'
                  marginLeft='5'
                  marginBottom='0.1rem'
                >
                  {`+ ${commodQuote.change} (+ ${commodQuote.changesPercentage}%)`}
                </Text>
              ) : (
                <Text fontSize='md' color='red.500' marginLeft='5'>
                  {` ${commodQuote.change} (${commodQuote.changesPercentage}%)`}
                </Text>
              )}
            </Flex>
          </Box>
          {isLoggedIn && addButton && (
            <Button
              display='flex'
              borderRadius='md'
              border='1px solid rgba(220, 14, 117, 0.9)'
              w='8rem'
              h='2rem'
              alignItems='center'
              justifyContent='center'
              marginTop='0.5rem'
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
              marginTop='0.5rem'
              marginLeft='1rem'
              fontSize='sm'
              color='gray'
            >
              Add to Watchlist
            </Box>
          )}
        </Flex>
      </GridItem>

      <GridItem
        area={'main'}
        height='max-content'
        p='0.5rem'
        marginLeft='2rem'
        bg='gray.100'
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='flex-start'
        borderRadius='md'
      >
        <Heading
          as='h3'
          size='md'
          marginBottom='1rem'
          marginTop='1rem'
          marginLeft='1rem'
          color='rgba(15, 22, 97, 1)'
        >
          About
        </Heading>

        <Flex justifyContent='flex-start' alignItems='flex-start' width='100%'>
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>CEO</Th>
                  <Th color='rgba(15, 22, 97, 1)'>Sector</Th>
                  <Th color='rgba(15, 22, 97, 1)'>Industry</Th>
                  <Th color='rgba(15, 22, 97, 1)'>Website</Th>

                  <Th color='rgba(15, 22, 97, 1)'>Exchange</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td style={{ whiteSpace: 'normal' }}>
                    {commodInfo.ceo ? commodInfo.ceo : '-'}
                  </Td>
                  <Td style={{ whiteSpace: 'normal' }}>
                    {commodInfo.sector ? commodInfo.sector : '-'}
                  </Td>
                  <Td style={{ whiteSpace: 'normal' }}>
                    {commodInfo.industry ? commodInfo.industry : '-'}
                  </Td>
                  <Td>{commodInfo.website ? commodInfo.website : '-'}</Td>

                  <Td>
                    {commodInfo.stockExchange ? commodInfo.stockExchange : '-'}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        <Heading
          as='h3'
          size='md'
          marginBottom='1rem'
          marginTop='1rem'
          marginLeft='1rem'
          color='rgba(15, 22, 97, 1)'
        >
          Description
        </Heading>

        <Text
          marginLeft='1rem'
          marginRight='1rem'
          fontSize='xs'
          textAlign='left'
          width='90%'
        >
          {commodInfo.description
            ? commodInfo.description
            : 'No Available Data'}
        </Text>
      </GridItem>

      {/* ---------------------------------------------------   Summary ------------------------------------------ */}

      <GridItem
        p='0.5rem'
        marginLeft='2rem'
        bg='gray.100'
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
        area={'summary'}
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        borderRadius='md'
      >
        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          height='min-content'
        >
          <Heading
            as='h3'
            size='md'
            marginBottom='1rem'
            marginTop='1rem'
            marginLeft='1rem'
            color='rgba(15, 22, 97, 1)'
          >
            Summary
          </Heading>

          <TableContainer display='flex' width='100%'>
            <Table size='sm'>
              <Tbody>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>CIK</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.cik ? commodInfo.cik : '-'}
                  </Td>
                </Tr>

                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>CUSIP</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.cusip ? commodInfo.cusip : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>ISIN</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.isin ? commodInfo.isin : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Address</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.address ? commodInfo.address : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>City</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.city ? commodInfo.city : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Country</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.country ? commodInfo.country : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>ZIP</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.zip ? commodInfo.zip : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Phone</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.phone ? commodInfo.phone : '-'}
                  </Td>
                </Tr>

                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Employee</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.fullTimeEmployees
                      ? commodInfo.fullTimeEmployees
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Market Cap</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodQuote.mktCap
                      ? formatNumber(commodQuote.mktCap)
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Price</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodQuote.price ? commodQuote.price : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>Volume Avg.</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodQuote.avgVolume
                      ? formatNumber(commodQuote.avgVolume)
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>DCF</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.dcf
                      ? Math.round(commodInfo.dcf * 100) / 100
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Th color='rgba(15, 22, 97, 1)'>IPO Date</Th>
                  <Td display='flex' justifyContent='flex-end'>
                    {commodInfo.ipoDate ? commodInfo.ipoDate : '-'}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </GridItem>

      {/* ----------------------------------------- Graph - Historical Prices ---------------------------- */}

      <GridItem
        ref={gridItemRef}
        height='auto'
        p='0.5rem'
        bg='gray.100'
        area={'historic'}
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        borderRadius='md'
      >
        <Box display='flex' width='100%' justifyContent='space-between'>
          <Heading
            as='h3'
            size='md'
            marginBottom='1rem'
            marginTop='1rem'
            marginLeft='1rem'
            color='rgba(15, 22, 97, 1)'
          >
            Historical Prices
          </Heading>

          {/* -------------------------------------- Buttons to choose the graph time interval -------------- */}
          <Flex
            marginRight='1rem'
            justifyContent='space-evenly'
            width='min-content'
            alignItems='center'
          >
            <Button
              color={graphDate === '5D' ? 'gray.100' : 'rgba(15, 22, 97, 1)'}
              size='sm'
              variant='ghost'
              onClick={() => setGraphDate('5D')}
              bg={graphDate === '5D' ? 'rgba(15, 22, 97, 1)' : 'transparent'}
              _hover={{
                bg: graphDate === '5D' ? null : 'rgba(15, 22, 97, 0.3)',
              }}
            >
              5D
            </Button>
            <Button
              color={graphDate === '1M' ? 'gray.100' : 'rgba(15, 22, 97, 1)'}
              size='sm'
              variant='ghost'
              onClick={() => setGraphDate('1M')}
              bg={graphDate === '1M' ? 'rgba(15, 22, 97, 1)' : 'transparent'}
              _hover={{
                bg: graphDate === '1M' ? null : 'rgba(15, 22, 97, 0.3)',
              }}
            >
              1M
            </Button>
            <Button
              color={graphDate === '3M' ? 'gray.100' : 'rgba(15, 22, 97, 1)'}
              size='sm'
              variant='ghost'
              onClick={() => setGraphDate('3M')}
              bg={graphDate === '3M' ? 'rgba(15, 22, 97, 1)' : 'transparent'}
              _hover={{
                bg: graphDate === '3M' ? null : 'rgba(15, 22, 97, 0.3)',
              }}
            >
              3M
            </Button>
            <Button
              color={graphDate === '6M' ? 'gray.100' : 'rgba(15, 22, 97, 1)'}
              size='sm'
              variant='ghost'
              onClick={() => setGraphDate('6M')}
              bg={graphDate === '6M' ? 'rgba(15, 22, 97, 1)' : 'transparent'}
              _hover={{
                bg: graphDate === '6M' ? null : 'rgba(15, 22, 97, 0.3)',
              }}
            >
              6M
            </Button>
            <Button
              color={graphDate === '1Y' ? 'gray.100' : 'rgba(15, 22, 97, 1)'}
              size='sm'
              variant='ghost'
              onClick={() => setGraphDate('1Y')}
              bg={graphDate === '1Y' ? 'rgba(15, 22, 97, 1)' : 'transparent'}
              _hover={{
                bg: graphDate === '1Y' ? null : 'rgba(15, 22, 97, 0.3)',
              }}
            >
              1Y
            </Button>
            <Button
              color={graphDate === '5Y' ? 'gray.100' : 'rgba(15, 22, 97, 1)'}
              size='sm'
              variant='ghost'
              onClick={() => setGraphDate('5Y')}
              bg={graphDate === '5Y' ? 'rgba(15, 22, 97, 1)' : 'transparent'}
              _hover={{
                bg: graphDate === '5Y' ? null : 'rgba(15, 22, 97, 0.3)',
              }}
            >
              5Y
            </Button>
          </Flex>
        </Box>
        <Flex justifyContent='center' alignItems='center'>
          {/* {graphDate && (
            <Graphs
              symbol={commodTicker}
              date={graphDate}
              graphW={gridItemWidth}
              graphH={gridItemHeight}
            />
          )} */}

          {historicalPrices.length > 0 && changes.length > 0 ? (
            <LineChart
              width={gridItemWidth * 0.9}
              height={gridItemHeight * 0.85}
              data={auxPrices}
            >
              <Line
                type='monotone'
                dataKey='close'
                stroke={changes[0][graphDate] > 0 ? '#38A169' : '#E53E3E'}
                dot={false}
              />
              <CartesianGrid stroke='#ccc' />
              <XAxis dataKey='label' fontSize='10' />
              <YAxis fontSize='10' />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          ) : (
            <Flex
              width={gridItemWidth * 0.9}
              height={gridItemHeight * 0.85}
              justifyContent='center'
              alignItems='center'
            >
              No Available Data
            </Flex>
          )}
        </Flex>
      </GridItem>

      {/* -------------------------------------------------   News ----------------------------------------------- */}

      <GridItem
        p='0.5rem'
        marginRight='1rem'
        marginTop='1.5rem'
        area={'news'}
        borderRadius='md'
        h='max-content'
      >
        <Heading
          size='lg'
          fontWeight='normal'
          textAlign='center'
          color='rgba(15, 22, 97, 1)'
        >
          Latest Market News
        </Heading>

        {news.length > 0 ? (
          news.map(singleNews => (
            <ReactRouterLink
              to={singleNews.url}
              key={singleNews.id}
              target='_blank'
            >
              <Box
                as={Card}
                direction={{ base: 'column', sm: 'row' }}
                width='90'
                overflow='hidden'
                variant='outline'
                margin='1rem'
                bg='gray.100'
                style={{
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', // Default box shadow
                }}
                _hover={{
                  border: '1px solid rgba(15, 22, 97, 1)',
                }}
              >
                <Image
                  objectFit='cover'
                  maxW='20%'
                  maxH='100%'
                  src={singleNews.image}
                  alt='img'
                  fallbackSrc='/news_substitute.jpg'
                />

                <Stack width='100%'>
                  <CardBody>
                    <Heading size='xs' fontWeight='normal' textAlign='left'>
                      {singleNews.title}
                    </Heading>
                    <Text
                      fontSize='2xs'
                      fontWeight='normal'
                      textAlign='right'
                      color='rgba(220, 14, 117, 0.9)'
                    >
                      {singleNews.symbol}
                    </Text>
                  </CardBody>
                </Stack>
              </Box>
            </ReactRouterLink>
          ))
        ) : (
          <Box
            w='90'
            margin='1rem'
            bg='gray.100'
            style={{
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', // Default box shadow
            }}
          >
            No Available Data
          </Box>
        )}
      </GridItem>
    </Grid>
  );
}

export default CommodityPage;
