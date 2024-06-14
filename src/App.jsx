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
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword'

function App() {

  // const isAdmin = false;
  const isDev = (localStorage.getItem('role') == 'dev') ? true : false;
  const isAdmin = (localStorage.getItem('role') == 'admin' || isDev) ? true : false;
  const isLoggedin = (localStorage.getItem('authToken')) ? true : false;
  const hasVoted = (localStorage.getItem('hasVoted') == 'false') ? false : true;
  // const hasVoted = false;
  console.log(localStorage.getItem('hasVoted'));

  return (
    <HashRouter>
      <NavbarComponent isAdmin={isAdmin} isDev={isDev} hasVoted={hasVoted} />
      <div className="mainBody border">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/voters' element={<Voters isAdmin={isAdmin} />} />
          {(!hasVoted) && <Route path='/vote' element={<Vote />} />}
          <Route path='/results' element={<Results />} />
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          {(isAdmin || isDev) && <Route path='/candidates' element={<Candidates />} />}
          {isLoggedin && <Route path='/changePassword' element={<ChangePassword />} />}
          <Route path='/forgotPassword' element={<ForgotPassword />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
