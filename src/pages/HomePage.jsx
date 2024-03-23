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

  const getMainNews = async () => {
    try {
      // const responseNews = await axios.get(
      //   'https://api.marketaux.com/v1/news/all?limit=15&language=en&api_token=3uu1zfw8GpGWNpAICjDrL1Al3ZeawfvsHDwW5Wy5'
      // );
      console.log(responseNews.data.data);
      setNews(responseNews.data.data);
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
    getMainStocks();
    // getMainNews();
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
      gap='4'
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

      <GridItem bg='pink.300' area={'main'} margin='1rem'>
        <Flex flexDirection='column'>
          {news.map(singleNews => {
            return (
              <ReactRouterLink to={singleNews.url} key={singleNews.uuid}>
                <Flex>
                  <Image
                    src={singleNews.image_url}
                    fallbackSrc='/news_substitute.jpg'
                    alt='news'
                    width='200px'
                    height='auto'
                  />
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='flex-start'
                  >
                    <Heading as='h3' size='md' noOfLines={1}>
                      {singleNews.title}
                    </Heading>
                    <Text>{singleNews.description}</Text>
                  </Box>
                </Flex>
                <Divider orientation='horizontal' />
              </ReactRouterLink>
            );
          })}
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
