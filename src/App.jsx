import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import InvestorCenter from './pages/InvestorCenter';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />

      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/investorcenter' element={<InvestorCenter />} />
          {/* <Route path='/watchlist' element={<WatchList />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
