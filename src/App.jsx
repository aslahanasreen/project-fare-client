import { useState,useContext } from 'react'
import './App.css'
import './bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Allprojects from './pages/Allprojects'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import { authContext } from './context/Contextapi';

function App() {

  const {authContextStatus,setAuthContextStatus} = useContext(authContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dash' element={authContextStatus?<Dashboard/>:<Auth/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/allp' element={authContextStatus?<Allprojects/>:<Auth/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
