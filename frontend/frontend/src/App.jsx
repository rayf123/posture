import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import MainPage from '../../Components/Mainpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>


        
      </Routes>
    </BrowserRouter>
  )
}

export default App
