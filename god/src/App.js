

import './App.css';
import Home from './pages/homePage/Home';
import Search from './pages/searchPage/Search';
import Navbar from './components/navbarFolder/Navbar';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    
    <div>
      
      <BrowserRouter>
      <div className='navbar'>
        <Navbar />
        </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
