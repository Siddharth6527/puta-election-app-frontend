import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Home from "./pages/Home";
import Voters from "./pages/Voters";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Candidates from './pages/Candidates';
import NavbarComponent from "./components/Navbar"
import ChangePassword from './pages/ChangePassword';
import { checkToken } from './utils/helpers';
import ErrorBoundary from './utils/errorBoundary';
import NotFoundPage from './pages/NotFound';

function App() {
  const isDev = localStorage.getItem("role") == "dev" ? true : false;
  const isAdmin = localStorage.getItem("role") == "admin" ? true : false;
  const isLoggedin = localStorage.getItem("authToken") ? true : false;
  const hasVoted = localStorage.getItem("hasVoted") == "false" ? false : true;

  window.onload = function () { checkToken(); }

  return (
    <ErrorBoundary>
      <HashRouter>
        <NavbarComponent isAdmin={isAdmin} hasVoted={hasVoted} />
        <div className="mainBody border">
          <Routes>
            <Route path='/' element={<Home />} />
            {isLoggedin && <Route exact path='/voters' element={<Voters isAdmin={isAdmin} />} />}
            {<Route path='/vote' element={<Vote />} />}
            <Route path='/results' element={<Results />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/SignUp' element={<SignUp />} /> */}
            {(isAdmin || isDev) && <Route path='/candidates' element={<Candidates isAdmin={isAdmin} />} />}
            {isLoggedin && <Route path='/changePassword' element={<ChangePassword />} />}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App;
