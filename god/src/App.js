

import './App.css';
import Home from './pages/homePage/Home';
import Search from './pages/searchPage/Search';
import Navbar from './components/navbarFolder/Navbar';
import Contact from './pages/contactPage/Contact';
import AddNewWorship from './pages/addNewWorshipPage/AddNewWorship';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';


function App() {
  return (  
    <BrowserRouter>
      <div className='navbar'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addNewWorship" element={<AddNewWorship />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
