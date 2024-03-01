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

  const getMainStocks = async () => {
    try {
      // const response1 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const response2 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/META?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const response3 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/NVDA?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const response4 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/GOOG?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const response5 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/COKE?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const response6 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/MSFT?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      console.log(response1.data);
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
      //   'https://api.marketaux.com/v1/news/all?limit=5&language=en&api_token=3uu1zfw8GpGWNpAICjDrL1Al3ZeawfvsHDwW5Wy5'
      // );
      console.log(responseNews.data.data);
      setNews(responseNews.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMainCommodities = async () => {
    try {
      // const responseC1 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/NGUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const responseC2 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/CLUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );
      // const responseC3 = await axios.get(
      //   'https://financialmodelingprep.com/api/v3/quote/GCUSD?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      // );

      console.log(responseC1.data);
      setCommodities([responseC1.data, responseC2.data, responseC3.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMainStocks();
    getMainNews();
    getMainCommodities();
  }, []);
  return (
    <Grid
      templateAreas={`"header header"
                  "main commod"
                  "main forex"
                  "main crypto"`}
      gridTemplateRows={'80px 1fr 1fr 1fr'}
      gridTemplateColumns={'2fr 1fr'}
      h='100vh'
      w='100vw'
      justifyContent='center'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='orange.300' area={'header'}>
        Header
      </GridItem>
      <GridItem pl='2' bg='pink.300' area={'main'}>
        Main
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'commod'}>
        Commod
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'forex'}>
        Forex
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'crypto'}>
        Crypto
      </GridItem>
    </Grid>

    // <div>
    //   {/* ----------------display stocks in a carousel ---------------*/}
    //   <section>
    //     <Box
    //       display='flex'
    //       animation='carousel 20s linear infinite'
    //       h='80px'
    //       justifyContent='space-evenly'
    //       alignItems='center'
    //       borderWidth='2px'
    //       borderColor='green.500'
    //       overflowX='auto'
    //       w='100vw'
    //     >
    //       {stocks.map(stock => {
    //         return (
    //           <Box
    //             key={stock.symbol}
    //             w='300px'
    //             h='50px'
    //             display='flex'
    //             alignItems='center'
    //             justifyContent='center'
    //             borderWidth='10px'
    //             borderColor='blue.500'
    //             color='gray.600'
    //           >
    //             <Text>
    //               {stock[0].symbol} {stock[0].price}
    //             </Text>

    //             {stock[0].changesPercentage > 0 ? (
    //               <Text color='green.500' marginLeft='5'>
    //                 {`+ ${stock[0].changesPercentage}%`}
    //               </Text>
    //             ) : (
    //               <Text color='red.500' marginLeft='5'>
    //                 {` ${stock[0].changesPercentage}%`}
    //               </Text>
    //             )}
    //           </Box>
    //         );
    //       })}
    //     </Box>
    //   </section>

    //   {/* ------------------- News ----------------- */}

    //   <section>
    //     <Flex flexDirection='column'>
    //       {news.map(singleNews => {
    //         return (
    //           <ReactRouterLink to={singleNews.url} key={singleNews.uuid}>
    //             <Flex>
    //               <Image
    //                 src={singleNews.image_url}
    //                 fallbackSrc='../public/news_substitute.jpg'
    //                 alt='news'
    //                 width='200px'
    //                 height='auto'
    //               />
    //               <Box
    //                 display='flex'
    //                 flexDirection='column'
    //                 justifyContent='flex-start'
    //               >
    //                 <Heading as='h3' size='md' noOfLines={1}>
    //                   {singleNews.title}
    //                 </Heading>
    //                 <Text>{singleNews.description}</Text>
    //               </Box>
    //             </Flex>
    //             <Divider orientation='horizontal' />
    //           </ReactRouterLink>
    //         );
    //       })}
    //     </Flex>

    //     {/* ------------- Commodities ------------- */}

    //     <Flex flexDirection='column' align='center'>
    //       <Heading as='h6' size='md'>
    //         Commodities
    //       </Heading>
    //       <Flex flexDirection='column'>
    //         {commodities.map(commod => {
    //           return (
    //             <Box
    //               key={commod.symbol}
    //               width='200px'
    //               h='50px'
    //               display='flex'
    //               alignItems='center'
    //               justifyContent='space'
    //               borderWidth='2px'
    //               borderColor='blue.500'
    //               color='gray.600'
    //               marginTop='5'
    //             >
    //               <Text>
    //                 {commod[0].symbol} {commod[0].price}
    //               </Text>
    //               <Spacer />
    //               {commod[0].changesPercentage > 0 ? (
    //                 <Text color='green.500' marginLeft='5'>
    //                   {`+ ${(
    //                     Math.round(commod[0].changesPercentage * 100) / 100
    //                   ).toFixed(3)}%`}
    //                 </Text>
    //               ) : (
    //                 <Text color='red.500' marginLeft='5'>
    //                   {` ${(
    //                     Math.round(commod[0].changesPercentage * 100) / 100
    //                   ).toFixed(3)}%`}
    //                 </Text>
    //               )}
    //             </Box>
    //           );
    //         })}
    //       </Flex>
    //     </Flex>
    //   </section>
    // </div>
  );
}

export default HomePage;
