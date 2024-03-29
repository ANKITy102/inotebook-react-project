import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup'
import Alert from './components/Alert';
export default function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <>
      <NoteState showAlert={showAlert}>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About showAlert={showAlert} />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}
