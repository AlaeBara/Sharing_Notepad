import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Home from './Home/Home'

const App = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
      <br />
    </>
  )
}

export default App