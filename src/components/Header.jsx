import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/Contextapi';

function Header() {

  const nav = useNavigate()
  const {authContextStatus,setAuthContextStatus} = useContext(authContext)

  const handleLogout =()=>{
    sessionStorage.clear()
    toast.info('User Logged Out!')
    nav('/')
    setAuthContextStatus(false)
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project fa-lg" style={{color: "#63E6BE",}} />
            {' '}
            Project Fare
          </Navbar.Brand>
          <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header