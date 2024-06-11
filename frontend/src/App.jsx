import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LoggedIn from './pages/LoggedIn'

const App = () => {

  const [name, setName] = useState("")

  useEffect(() => {
    const getUser = () => {
      setName(window.localStorage.getItem('name'))
    }
    getUser()
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={name ? <LoggedIn name={name} /> : <Home />} />
          <Route path='/login' element={name ? <LoggedIn name={name} /> : <Login />} />
          <Route path='/signUp' element={name ? <LoggedIn name={name} /> : <SignUp />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App