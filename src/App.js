 import React from 'react'
 import Home from './pages/Home'
 import Pays from './pages/Pays'
import './App.css'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/unpays/:id' element={<Pays />} />
      </Routes>
    </div>
  );
}
 

export default App;
