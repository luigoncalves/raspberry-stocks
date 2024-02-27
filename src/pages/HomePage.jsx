import { useState, useEffect } from 'react';
import axios from 'axios';

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
        'https://financialmodelingprep.com/api/v3/quote/GOOG?apikey=bad27d0fe5c04662a21dd5d7ca55ba93'
      );
      console.log(response1.data);
      setStocks([response1.data, response2.data, response3.data]);
    } catch (error) {}
  };

  useEffect(() => {
    getMainStocks();
  }, []);
  return (
    <div>
      <section>
        <ul>
          {stocks.map(stock => {
            return (
              <li>
                {stock[0].symbol} {stock[0].name} {stock[0].price}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
