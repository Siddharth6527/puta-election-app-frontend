import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Voters from "./pages/Voters";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavbarComponent from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavbarComponent />
      <div className="mainBody border">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/voters' element={<Voters />} />
          <Route path='/vote' element={<Vote />} />
          <Route path='/results' element={<Results />} />
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
