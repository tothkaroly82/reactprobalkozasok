import React from 'react'
import logo from './logo.svg'
import './App.css'
import Menu from './components/menu'
import BasicSelection from './components/csvheader'


function App () {
  return (
    <div className='App'>
      <Menu />
      <BasicSelection />
    </div>
  )
}

export default App
