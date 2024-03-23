import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Graphs from './components/Graphs';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
import CommodityPage from './pages/CommodityPage';
import ForexPage from './pages/ForexPage';
import CryptoPage from './pages/CryptoPage';
// import InvestorCenter from './pages/InvestorCenter';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import ChangeUsername from './pages/ChangeUsername';
import ChangePassword from './pages/ChangePassword';
import WatchList from './pages/WatchList';
import Search from './pages/Search';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />

      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='stocks/:stockTicker' element={<StockPage />} />
          <Route path='commodities/:commodTicker' element={<CommodityPage />} />
          <Route path='forex/:forexTicker' element={<ForexPage />} />
          <Route path='crypto/:cryptoTicker' element={<CryptoPage />} />
          {/* <Route path='/investorcenter' element={<InvestorCenter />} /> */}
          <Route
            path='/login'
            element={
              <IsAnon>
                <LogIn />
              </IsAnon>
            }
          />
          <Route
            path='/signup'
            element={
              <IsAnon>
                <SignUp />
              </IsAnon>
            }
          />
          <Route
            path='/profile/:name'
            element={
              <IsPrivate>
                <UserProfile />
              </IsPrivate>
            }
          />
          <Route
            path='/changeUsername'
            element={
              <IsPrivate>
                <ChangeUsername />
              </IsPrivate>
            }
          />
          <Route
            path='/changePassword'
            element={
              <IsPrivate>
                <ChangePassword />
              </IsPrivate>
            }
          />
          <Route
            path='/watchlist'
            element={
              <IsPrivate>
                <WatchList />
              </IsPrivate>
            }
          />
          <Route path='/search/:field' element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
