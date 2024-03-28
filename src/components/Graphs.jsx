import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Flex } from '@chakra-ui/react';

const apiKey = `${import.meta.env.VITE_API_KEY}`;

function Graphs(props) {
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [auxPrices, setAuxPrices] = useState([]);
  const [changes, setChanges] = useState([]);

  // ---------------------------------------  this function will get the daily value of the stock for the last 5 years

  const getHistoricalData = async () => {
    if (props.symbol) {
      try {
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${props.symbol}?apikey=${apiKey}`
        );
        setHistoricalPrices(response.data.historical.reverse());
        props.setDate(props.date);

        if (props.date) {
          chooseGraphDates();
        }

        stockPriceChanges();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // -------------------------------------  choosing the time interval

  const chooseGraphDates = () => {
    if (props.date === '5D') {
      setAuxPrices(historicalPrices.slice(-5));
    } else if (props.date === '1M') {
      setAuxPrices(historicalPrices.slice(-20));
    } else if (props.date === '3M') {
      setAuxPrices(historicalPrices.slice(-60));
    } else if (props.date === '6M') {
      setAuxPrices(historicalPrices.slice(-120));
    } else if (props.date === '1Y') {
      setAuxPrices(historicalPrices.slice(-240));
    } else if (props.date === '5Y') {
      setAuxPrices(historicalPrices);
    }
    // if the variable comes as undefined, it's assumed as 1Y
    else {
      setAuxPrices(historicalPrices.slice(-240));
    }
  };

  const stockPriceChanges = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock-price-change/${props.symbol}?apikey=${apiKey}`
      );
      setChanges(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------  build the graph

  useEffect(() => {
    getHistoricalData();
    console.log('this is the time stamp:', props.date);
    // if (historicalPrices && auxPrices) {
    //   stockPriceChanges();
    // }
  }, [props]);

  return (
    <div>
      {historicalPrices.length > 0 && changes.length > 0 ? (
        <LineChart
          width={props.graphW * 0.9}
          height={props.graphH * 0.85}
          data={auxPrices}
        >
          <Line
            type='monotone'
            dataKey='close'
            stroke={changes[0][props.date] > 0 ? '#38A169' : '#E53E3E'}
            dot={false}
          />
          <CartesianGrid stroke='#ccc' />
          <XAxis dataKey='label' fontSize='10' />
          <YAxis fontSize='10' />
          <Tooltip />
        </LineChart>
      ) : (
        <Flex
          width={props.graphW * 0.9}
          height={props.graphH * 0.85}
          justifyContent='center'
          alignItems='center'
        >
          No Available Data
        </Flex>
      )}
    </div>
  );
}

export default Graphs;
