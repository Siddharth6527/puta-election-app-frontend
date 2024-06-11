import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Voters from "./pages/Voters";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Candidates from './pages/Candidates';
import NavbarComponent from "./components/Navbar"
import { Router } from '@mui/icons-material';

function App() {

  // const isAdmin = false;
  const isAdmin = true;

  return (
    <HashRouter>
      <NavbarComponent isAdmin={isAdmin} />
      <div className="mainBody border">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/voters' element={<Voters isAdmin={isAdmin} />} />
          <Route path='/vote' element={<Vote />} />
          <Route path='/results' element={<Results />} />
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          {isAdmin && <Route path='/candidates' element={<Candidates />} />}
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
