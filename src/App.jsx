import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
import CommodityPage from './pages/CommodityPage';
import ForexPage from './pages/ForexPage';
import CryptoPage from './pages/CryptoPage';
import InvestorCenter from './pages/InvestorCenter';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />

      <div style={{ paddingTop: '50px' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='stocks/:stockTicker' element={<StockPage />} />
          <Route path='commodities/:commodTicker' element={<CommodityPage />} />
          <Route path='forex/:forexTicker' element={<ForexPage />} />
          <Route path='crypto/:cryptoTicker' element={<CryptoPage />} />
          <Route path='/investorcenter' element={<InvestorCenter />} />
          {/* <Route path='/watchlist' element={<WatchList />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
