import { useState, useEffect } from 'react';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
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
  StatArrow,
  Stat,
  Icon,
} from '@chakra-ui/react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { deleteItem, getAllUserItems } from '../api/item.api';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PiDotOutlineBold } from 'react-icons/pi';
const apiKey = `${import.meta.env.VITE_API_KEY}`;

function HomePage() {
  const { isLoggedIn, user, watchlist, setWatchlist } = useContext(AuthContext);
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [forex, setForex] = useState([]);
  const [crypto, setCrypto] = useState([]);

  // --------------- get main stock info for the carousel ----------

  const getMainStocks = async () => {
    try {
      const response1 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=${apiKey}`
      );
      const response2 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/META?apikey=${apiKey}`
      );
      const response3 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/NVDA?apikey=${apiKey}`
      );
      const response4 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/GOOG?apikey=${apiKey}`
      );
      const response5 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/COKE?apikey=${apiKey}`
      );
      const response6 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/MSFT?apikey=${apiKey}`
      );
      const response7 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/DIS?apikey=${apiKey}`
      );
      const response8 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/TSLA?apikey=${apiKey}`
      );
      setStocks([
        response1.data,
        response2.data,
        response3.data,
        response4.data,
        response5.data,
        response6.data,
        response7.data,
        response8.data,
      ]);
      console.log('Stocks:', stocks);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------  get main News  ----------------------

  const getMainNews = async () => {
    try {
      const responseNews = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock_news?page=0&apikey=${apiKey}`
      );
      console.log(responseNews.data);
      setNews(responseNews.data);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------  get main commodities  -----------

  const getMainCommodities = async () => {
    try {
      const responseC1 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/NGUSD?apikey=${apiKey}`
      );
      const responseC2 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/CLUSD?apikey=${apiKey}`
      );
      const responseC3 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/GCUSD?apikey=${apiKey}`
      );

      console.log(responseC1.data);
      setCommodities([responseC1.data, responseC2.data, responseC3.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------  get main forex  -----------

  const getMainForex = async () => {
    try {
      const responseF1 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/EURUSD?apikey=${apiKey}`
      );
      const responseF2 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/GBPUSD?apikey=${apiKey}`
      );
      const responseF3 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/USDJPY?apikey=${apiKey}`
      );

      console.log(responseF1.data);
      setForex([responseF1.data, responseF2.data, responseF3.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------  get main crypto  -----------------------------------

  const getMainCrypto = async () => {
    try {
      const responseCr1 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/BTCUSD?apikey=${apiKey}`
      );
      const responseCr2 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/ETHUSD?apikey=${apiKey}`
      );
      const responseCr3 = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/BNBUSD?apikey=${apiKey}`
      );

      console.log(responseCr1.data);
      setCrypto([responseCr1.data, responseCr2.data, responseCr3.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------  get user Watchlist  ------------------------------

  const getWatchlist = async () => {
    try {
      const response = await getAllUserItems(user);
      console.log('this is the watchList:', response.data);
      setUserWatchlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMainNews();
    getMainStocks();
    getMainCommodities();
    getMainForex();
    getMainCrypto();
    if (user && isLoggedIn) {
      getWatchlist();
    }
    console.log('Stocks:', stocks);
  }, []);

  return (
    <Grid
      templateAreas={`"header header"
      "logo logo"
                  "main commod"
                 `}
      gridTemplateRows={'10% 15% 1fr'}
      gridTemplateColumns={'2fr 1fr'}
      h='100vh'
      overflowY='auto'
      w='100vw'
      justifyContent='center'
      gap='2'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem bg='rgba(220, 14, 117, 0.9)' area={'header'} height='100%'>
        <Flex h='100%'>
          <Marquee speed='30' pauseOnHover={true}>
            {stocks.map(stock => {
              return (
                <ReactRouterLink to={`/stocks/${stock[0].symbol}`}>
                  <Box
                    width='max-content'
                    h='2rem'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    color='rgba(15, 22, 97, 1)'
                    bg='gray.100'
                    marginRight='2rem'
                    padding='1.5rem'
                    borderRadius='md'
                    boxShadow='0px 2px 12px rgba(0, 0, 0, 0.5)'
                    _hover={{
                      border: '1px solid rgba(15, 22, 97, 1)',
                    }}
                  >
                    <Text>
                      {stock[0].symbol} {stock[0].price}
                    </Text>
                    <Spacer />
                    {stock[0].changesPercentage > 0 ? (
                      <Stat>
                        <Text
                          color='green.400'
                          marginLeft='1rem'
                          w='max-content'
                        >
                          <StatArrow type='increase' />
                          {`${(
                            Math.round(stock[0].changesPercentage * 100) / 100
                          ).toFixed(3)}%`}
                        </Text>
                      </Stat>
                    ) : (
                      <Stat>
                        <Text color='red.500' marginLeft='1rem' w='max-content'>
                          <StatArrow type='decrease' />
                          {`${(
                            Math.round(stock[0].changesPercentage * 100) / 100
                          ).toFixed(3)}%`.slice(1)}
                        </Text>
                      </Stat>
                    )}
                  </Box>
                </ReactRouterLink>
              );
            })}
          </Marquee>
        </Flex>
      </GridItem>

      {/* -----------------------------------   Logo Item ------------------------------------------ */}

      <GridItem
        pl='2'
        bg='white'
        area={'logo'}
        display='flex'
        justifyContent='center'
        alignSelf='center'
      >
        <Heading>Raspberry Stocks</Heading>
      </GridItem>

      {/* ---------------------------------------   News -------------------------------------- */}

      <GridItem area={'main'} margin='1rem' marginLeft='2.5rem'>
        <Flex
          flexDirection='column'
          width='100%'
          height='100%'
          border='1px solid black'
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            border='1px solid black'
            marginBottom='1rem'
            height='40%'
          >
            <Box width='65%' marginLeft='1rem' border='1px solid black'>
              <Carousel
                useKeyboardArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                width='100%'
              >
                {news.slice(0, 10).map(singleNews => {
                  return (
                    <ChakraLink
                      as={ReactRouterLink}
                      to={singleNews.url}
                      target='_blank'
                    >
                      <Box
                        key={singleNews.url}
                        width='100%'
                        position='relative'
                      >
                        <Image
                          alt='sample_file'
                          src={singleNews.image}
                          borderRadius='lg'
                          width='20000px'
                        />
                        <Text
                          position='absolute'
                          bottom='0'
                          left='0'
                          padding='1rem'
                          background='rgba(0, 0, 0, 0.5)'
                          color='gray.100'
                          width='100%'
                        >
                          {singleNews.title}
                        </Text>
                      </Box>
                    </ChakraLink>
                  );
                })}
              </Carousel>
            </Box>
            <Flex
              width='30%'
              height='100%'
              flexDirection='column'
              pt='1rem'
              pb='1rem'
              justifyContent='space-between'
              border='1px solid black'
            >
              {news.slice(10, 17).map(singleNews => {
                return (
                  <ChakraLink
                    as={ReactRouterLink}
                    to={singleNews.url}
                    target='_blank'
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Flex
                      key={singleNews.url}
                      color='rgba(15, 22, 97, 1)'
                      fontSize='0.7rem'
                      textAlign='left'
                      marginBottom='0.5rem'
                      _hover={{ color: 'rgba(220, 14, 117, 0.9)' }}
                    >
                      <Icon
                        as={PiDotOutlineBold}
                        w={5}
                        h={5}
                        color='rgba(15, 22, 97, 1)'
                      />
                      {singleNews.title.length > 70
                        ? `${singleNews.title.slice(0, 70)}...`
                        : `${singleNews.title}`}
                    </Flex>
                  </ChakraLink>
                );
              })}
            </Flex>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='start'
            border='1px solid black'
            marginBottom='1rem'
            marginTop='1rem'
            height='20%'
          >
            {news.slice(17, 20).map(singleNews => {
              return (
                <ChakraLink
                  as={ReactRouterLink}
                  to={singleNews.url}
                  target='_blank'
                  _hover={{ textDecoration: 'none' }}
                >
                  <Flex
                    key={singleNews.url}
                    border='1px solid black'
                    alignItems='center'
                    flexDirection='column'
                    color='rgba(15, 22, 97, 1)'
                    fontSize='0.7rem'
                    textAlign='left'
                    _hover={{ color: 'rgba(220, 14, 117, 0.9)' }}
                  >
                    <Image
                      alt='sample_file'
                      src={singleNews.image}
                      borderRadius='lg'
                      marginBottom='0.3rem'
                      width='80%'
                    />

                    <Text width='80%'>
                      {singleNews.title.length > 100
                        ? `${singleNews.title.slice(0, 100)}...`
                        : `${singleNews.title}`}
                    </Text>
                  </Flex>
                </ChakraLink>
              );
            })}
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='start'
            border='1px solid black'
            marginBottom='1rem'
            marginTop='1rem'
            height='20%'
          >
            {news.slice(20, 23).map(singleNews => {
              return (
                <ChakraLink
                  as={ReactRouterLink}
                  to={singleNews.url}
                  target='_blank'
                  _hover={{ textDecoration: 'none' }}
                >
                  <Flex
                    key={singleNews.url}
                    border='1px solid black'
                    alignItems='center'
                    flexDirection='column'
                    color='rgba(15, 22, 97, 1)'
                    fontSize='0.7rem'
                    textAlign='left'
                    _hover={{ color: 'rgba(220, 14, 117, 0.9)' }}
                  >
                    <Image
                      alt='sample_file'
                      src={singleNews.image}
                      borderRadius='lg'
                      marginBottom='0.3rem'
                      width='80%'
                    />

                    <Text width='80%'>
                      {singleNews.title.length > 100
                        ? `${singleNews.title.slice(0, 100)}...`
                        : `${singleNews.title}`}
                    </Text>
                  </Flex>
                </ChakraLink>
              );
            })}
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='start'
            border='1px solid black'
            marginBottom='1rem'
            marginTop='1rem'
            height='20%'
          >
            {news.slice(23, 26).map(singleNews => {
              return (
                <ChakraLink
                  as={ReactRouterLink}
                  to={singleNews.url}
                  target='_blank'
                  _hover={{ textDecoration: 'none' }}
                >
                  <Flex
                    key={singleNews.url}
                    border='1px solid black'
                    alignItems='center'
                    flexDirection='column'
                    color='rgba(15, 22, 97, 1)'
                    fontSize='0.7rem'
                    textAlign='left'
                    _hover={{ color: 'rgba(220, 14, 117, 0.9)' }}
                  >
                    <Image
                      alt='sample_file'
                      src={singleNews.image}
                      borderRadius='lg'
                      marginBottom='0.3rem'
                      width='80%'
                    />

                    <Text width='80%'>
                      {singleNews.title.length > 100
                        ? `${singleNews.title.slice(0, 100)}...`
                        : `${singleNews.title}`}
                    </Text>
                  </Flex>
                </ChakraLink>
              );
            })}
          </Box>
        </Flex>
      </GridItem>

      {/* -----------------------------------------------   Side bar with commod, forex and crypto---------------------- */}

      <GridItem area={'commod'} margin='1rem'>
        <Flex flexDirection='column' align='center'>
          {user && isLoggedIn ? (
            <Flex
              flexDirection='column'
              w='85%'
              marginBottom='2rem'
              bg='gray.100'
              borderRadius='md'
              style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)' }}
            >
              <ChakraLink
                as={ReactRouterLink}
                to={'/watchlist'}
                width='100%'
                _hover={{ textDecoration: 'none' }}
              >
                <Flex
                  alignItems='center'
                  pt='1rem'
                  pb='1rem'
                  pl='3rem'
                  borderRadius='md'
                  textAlign='left'
                  bg='rgba(15, 22, 97, 1)'
                  _hover={{
                    bg: 'rgba(220, 14, 117, 0.9)',
                  }}
                >
                  <Text
                    marginRight='1rem'
                    fontSize='xl'
                    textAlign='left'
                    color='gray.100'
                  >
                    Go to your Watchlist
                  </Text>

                  <Icon
                    as={BsArrowRightCircleFill}
                    w={6}
                    h={6}
                    color='gray.100'
                  />
                </Flex>
              </ChakraLink>
            </Flex>
          ) : null}

          <Flex
            flexDirection='column'
            p='3rem'
            w='85%'
            marginBottom='2rem'
            bg='gray.100'
            borderRadius='md'
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
          >
            <Heading
              as='h6'
              size='lg'
              marginBottom='2rem'
              color='rgba(15, 22, 97, 1)'
              textAlign='left'
            >
              Commodities
            </Heading>
            {commodities.map(commod => {
              return (
                <ReactRouterLink to={`/commodities/${commod[0].symbol}`}>
                  <Box
                    width='auto'
                    h='2rem'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    color='rgba(15, 22, 97, 1)'
                    bg='white'
                    marginBottom='1rem'
                    padding='1.5rem'
                    borderRadius='md'
                    boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
                    _hover={{
                      border: '1px solid rgba(15, 22, 97, 1)',
                    }}
                  >
                    <Text>
                      {commod[0].symbol} {commod[0].price}
                    </Text>
                    <Spacer />

                    {commod[0].changesPercentage > 0 ? (
                      <Stat>
                        <Text color='green.500' marginLeft='5' w='max-content'>
                          <StatArrow type='increase' />
                          {`${(
                            Math.round(commod[0].changesPercentage * 100) / 100
                          ).toFixed(3)}%`}
                        </Text>
                      </Stat>
                    ) : (
                      <Stat>
                        <Text color='red.500' marginLeft='5' w='max-content'>
                          <StatArrow type='decrease' />

                          {`${(
                            Math.round(commod[0].changesPercentage * 100) / 100
                          ).toFixed(2)}%`.slice(1)}
                        </Text>
                      </Stat>
                    )}
                  </Box>
                </ReactRouterLink>
              );
            })}
          </Flex>

          <Flex
            flexDirection='column'
            p='3rem'
            w='85%'
            marginBottom='2rem'
            bg='gray.100'
            borderRadius='md'
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
          >
            <Heading
              as='h6'
              size='lg'
              marginBottom='2rem'
              color='rgba(15, 22, 97, 1)'
              textAlign='left'
            >
              Forex
            </Heading>
            {forex.map(forexPair => {
              return (
                <ReactRouterLink to={`/forex/${forexPair[0].symbol}`}>
                  <Box
                    width='auto'
                    h='2rem'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    color='rgba(15, 22, 97, 1)'
                    bg='white'
                    marginBottom='1rem'
                    padding='1.5rem'
                    borderRadius='md'
                    boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
                    _hover={{
                      border: '1px solid rgba(15, 22, 97, 1)',
                    }}
                  >
                    <Text>
                      {forexPair[0].symbol}{' '}
                      {Math.round(forexPair[0].price * 100) / 100}
                    </Text>
                    <Spacer />
                    {forexPair[0].changesPercentage > 0 ? (
                      <Stat>
                        <Text color='green.500' marginLeft='5' w='max-content'>
                          <StatArrow type='increase' />
                          {`${(
                            Math.round(forexPair[0].changesPercentage * 100) /
                            100
                          ).toFixed(3)}%`}
                        </Text>
                      </Stat>
                    ) : (
                      <Stat>
                        <Text color='red.500' marginLeft='5' w='max-content'>
                          <StatArrow type='decrease' />

                          {`${(
                            Math.round(forexPair[0].changesPercentage * 100) /
                            100
                          ).toFixed(2)}%`.slice(1)}
                        </Text>
                      </Stat>
                    )}
                  </Box>
                </ReactRouterLink>
              );
            })}
          </Flex>

          <Flex
            flexDirection='column'
            p='3rem'
            w='85%'
            marginBottom='2rem'
            bg='gray.100'
            borderRadius='md'
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
          >
            <Heading
              as='h6'
              size='lg'
              marginBottom='2rem'
              color='rgba(15, 22, 97, 1)'
              textAlign='left'
            >
              Crypto
            </Heading>
            {crypto.map(cryptoPair => {
              return (
                <ReactRouterLink to={`/crypto/${cryptoPair[0].symbol}`}>
                  <Box
                    width='auto'
                    h='2rem'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    color='rgba(15, 22, 97, 1)'
                    bg='white'
                    marginBottom='1rem'
                    padding='1.5rem'
                    borderRadius='md'
                    boxShadow='0px 2px 2px rgba(0, 0, 0, 0.5)'
                    _hover={{
                      border: '1px solid rgba(15, 22, 97, 1)',
                    }}
                  >
                    <Text>
                      {cryptoPair[0].symbol} {cryptoPair[0].price}
                    </Text>
                    <Spacer />
                    {cryptoPair[0].changesPercentage > 0 ? (
                      <Stat>
                        <Text color='green.500' marginLeft='5' w='max-content'>
                          <StatArrow type='increase' />
                          {`${(
                            Math.round(cryptoPair[0].changesPercentage * 100) /
                            100
                          ).toFixed(3)}%`}
                        </Text>
                      </Stat>
                    ) : (
                      <Stat>
                        <Text color='red.500' marginLeft='5' w='max-content'>
                          <StatArrow type='decrease' />

                          {`${(
                            Math.round(cryptoPair[0].changesPercentage * 100) /
                            100
                          ).toFixed(2)}%`.slice(1)}
                        </Text>
                      </Stat>
                    )}
                  </Box>
                </ReactRouterLink>
              );
            })}
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
