import { useState } from 'react'

import './App.css'

import CamTest from '../../Components/CamTest';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CamTest />}/>


        
      </Routes>
    </BrowserRouter>
  )
}

export default App
