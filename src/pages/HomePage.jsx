import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Box, Text } from '@chakra-ui/react';

function HomePage() {
  const [stocks, setStocks] = useState([]);
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
      console.log(response1.data);
      setStocks([
        response1.data,
        response2.data,
        response3.data,
        response4.data,
        response5.data,
        response6.data,
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    getMainStocks();
  }, []);
  return (
    <>
      <Flex
        h='80px'
        left={0}
        justifyContent='space-evenly'
        alignItems='center'
        borderWidth='2px'
        borderColour='red.500'
        overflowX='hidden'
        w='100vw'
      >
        <Box display='flex' animation='carousel 20s linear infinite'>
          {stocks.map(stock => {
            return (
              <Box
                w='300px'
                h='50px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                borderWidth='10px'
                borderColour='blue.500'
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
            );
          })}
        </Box>
      </Flex>
    </>
  );
}

export default HomePage;
