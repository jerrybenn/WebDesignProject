import './App.css';
import Home from './pages/homePage/Home';
import Search from './pages/searchPage/Search';
import Navbar from './components/navbarFolder/Navbar';
import Contact from './pages/contactPage/Contact';
import AddNewWorship from './pages/addNewWorshipPage/AddNewWorship';
import Saved from './pages/savedPage/Saved';
import Settings from './pages/settingsPage/Settings';
import Account from './pages/accountPage/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider'; // Corrected import

function App() {
  return (  
    <BrowserRouter>  
      <AuthProvider>
        <div className='navbar'>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addNewWorship" element={<AddNewWorship />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
