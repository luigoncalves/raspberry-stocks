import { useState, useEffect } from 'react';
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
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [forex, setForex] = useState([]);
  const [crypto, setCrypto] = useState([]);

  const getMainStocks = async () => {
    try {
      const response1 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const response2 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/META?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const response3 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/NVDA?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const response4 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/GOOG?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const response5 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/COKE?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const response6 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/MSFT?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      console.log('Stocks:', response1.data);
      setStocks([
        response1.data,
        response2.data,
        response3.data,
        response4.data,
        response5.data,
        response6.data,
      ]);
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

  const getMainCommodities = async () => {
    try {
      const responseC1 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/NGUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const responseC2 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/CLUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const responseC3 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/GCUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );

      console.log(responseC1.data);
      setCommodities([responseC1.data, responseC2.data, responseC3.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMainForex = async () => {
    try {
      const responseF1 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/EURUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const responseF2 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/GBPUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const responseF3 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/USDJPY?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );

      console.log(responseF1.data);
      setForex([responseF1.data, responseF2.data, responseF3.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const getMainCrypto = async () => {
    try {
      const responseCr1 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/BTCUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const responseCr2 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/ETHUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      const responseCr3 = await axios.get(
        'https://financialmodelingprep.com/api/v3/quote/ADAUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );

      console.log(responseCr1.data);
      setCrypto([responseCr1.data, responseCr2.data, responseCr3.data]);
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
  }, []);
  return (
    <Grid
      templateAreas={`"header header"
      "logo logo"
                  "main commod"
                 `}
      gridTemplateRows={'80px 100px 1fr'}
      gridTemplateColumns={'2fr 1fr'}
      h='maxContent'
      w='100vw'
      justifyContent='center'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='orange.300' area={'header'}>
        <Box
          display='flex'
          animation='carousel 20s linear infinite'
          h='80px'
          justifyContent='space-evenly'
          alignItems='center'
          borderWidth='2px'
          borderColor='green.500'
          overflowX='auto'
          w='100vw'
        >
          {stocks.map(stock => {
            return (
              <ChakraLink
                as={ReactRouterLink}
                to={`/stocks/${stock[0].symbol}`}
              >
                <Box
                  w='300px'
                  h='50px'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  borderWidth='10px'
                  borderColor='blue.500'
                  color='gray.600'
                >
                  <Text>
                    {stock[0].symbol} {stock[0].price}
                  </Text>

                  {stock[0].changesPercentage > 0 ? (
                    <Text color='green.500' marginLeft='5'>
                      {`+ ${stock[0].changesPercentage}%`}
                    </Text>
                  ) : (
                    <Text color='red.500' marginLeft='5'>
                      {` ${stock[0].changesPercentage}%`}
                    </Text>
                  )}
                </Box>
              </ChakraLink>
            );
          })}
        </Box>
      </GridItem>
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
      <GridItem pl='2' bg='pink.300' area={'main'}>
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
      <GridItem pl='2' bg='green.300' area={'commod'}>
        <Flex flexDirection='column' align='center'>
          <Flex flexDirection='column'>
            <Heading as='h6' size='md'>
              Commodities
            </Heading>
            {commodities.map(commod => {
              return (
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/commodities/${commod[0].symbol}`}
                >
                  <Box
                    width='200px'
                    h='50px'
                    display='flex'
                    alignItems='center'
                    justifyContent='space'
                    borderWidth='2px'
                    borderColor='blue.500'
                    color='gray.600'
                    marginTop='5'
                  >
                    <Text>
                      {commod[0].symbol} {commod[0].price}
                    </Text>
                    <Spacer />
                    {commod[0].changesPercentage > 0 ? (
                      <Text color='green.500' marginLeft='5'>
                        {`+ ${(
                          Math.round(commod[0].changesPercentage * 100) / 100
                        ).toFixed(3)}%`}
                      </Text>
                    ) : (
                      <Text color='red.500' marginLeft='5'>
                        {` ${(
                          Math.round(commod[0].changesPercentage * 100) / 100
                        ).toFixed(3)}%`}
                      </Text>
                    )}
                  </Box>
                </ChakraLink>
              );
            })}
          </Flex>

          <Flex flexDirection='column'>
            <Heading as='h6' size='md'>
              Forex
            </Heading>
            {forex.map(forexPair => {
              return (
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/forex/${forexPair[0].symbol}`}
                >
                  <Box
                    width='200px'
                    h='50px'
                    display='flex'
                    alignItems='center'
                    justifyContent='space'
                    borderWidth='2px'
                    borderColor='blue.500'
                    color='gray.600'
                    marginTop='5'
                  >
                    <Text>
                      {forexPair[0].symbol} {forexPair[0].price}
                    </Text>
                    <Spacer />
                    {forexPair[0].changesPercentage > 0 ? (
                      <Text color='green.500' marginLeft='5'>
                        {`+ ${(
                          Math.round(forexPair[0].changesPercentage * 100) / 100
                        ).toFixed(3)}%`}
                      </Text>
                    ) : (
                      <Text color='red.500' marginLeft='5'>
                        {` ${(
                          Math.round(forexPair[0].changesPercentage * 100) / 100
                        ).toFixed(3)}%`}
                      </Text>
                    )}
                  </Box>
                </ChakraLink>
              );
            })}
          </Flex>
          <Flex flexDirection='column'>
            <Heading as='h6' size='md'>
              Crypto
            </Heading>
            {crypto.map(cryptoPair => {
              return (
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/crypto/${cryptoPair[0].symbol}`}
                >
                  <Box
                    width='200px'
                    h='50px'
                    display='flex'
                    alignItems='center'
                    justifyContent='space'
                    borderWidth='2px'
                    borderColor='blue.500'
                    color='gray.600'
                    marginTop='5'
                  >
                    <Text>
                      {cryptoPair[0].symbol} {cryptoPair[0].price}
                    </Text>
                    <Spacer />
                    {cryptoPair[0].changesPercentage > 0 ? (
                      <Text color='green.500' marginLeft='5'>
                        {`+ ${(
                          Math.round(cryptoPair[0].changesPercentage * 100) /
                          100
                        ).toFixed(3)}%`}
                      </Text>
                    ) : (
                      <Text color='red.500' marginLeft='5'>
                        {` ${(
                          Math.round(cryptoPair[0].changesPercentage * 100) /
                          100
                        ).toFixed(3)}%`}
                      </Text>
                    )}
                  </Box>
                </ChakraLink>
              );
            })}
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
