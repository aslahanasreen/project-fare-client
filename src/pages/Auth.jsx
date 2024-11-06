import React, { useState,useContext } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { registerApi,loginApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/Contextapi';


function Auth() {

    const [authStatus, setAuthStatus] = useState(false)
    const [user,setUser] = useState({
        email:'',username:'',password:''
    })
    const {authContextStatus,setAuthContextStatus} = useContext(authContext)

    const nav = useNavigate()

    const changeAuth = () => {
        setAuthStatus(!authStatus)
        setUser({
            email:'',username:'',password:''
        })
    }

    const handleRegister = async()=>{
        console.log(user);
        const {email,username,password} = user

        if(!email || !username || !password){
            toast.warning("Enter valid data!!")
        }
        else{

            const res = await registerApi(user)
            console.log(res);
            if(res.status==200){
                toast.success("Registration successful!!")
                setUser({
                    email:'',username:'',password:''
                })
                changeAuth()
                
            }
            else{
                toast.error("Registration failed!!")
            }
        }
    }

    const handleLogin = async()=>{
        const {email,password}=user
        if( !email || !password){
            toast.warning("Enter valid data!!")
        }
        else{
            const res= await loginApi(user)
            console.log(res)
            if(res.status==200){
                toast.success('Login successful!!')
                setUser({
                    email:'',username:'',password:''
                })
                sessionStorage.setItem("token",res.data.token)
                sessionStorage.setItem("username",res.data.username)
                sessionStorage.setItem("github",res.data.github)
                sessionStorage.setItem("linkedin",res.data.linkedin)
                sessionStorage.setItem("profile",res.data.profile)
                nav('/dash')
                setAuthContextStatus(true)
            }
            else{
                toast.error(res.response.data)
            }
        }
    }

    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center m-5' >
                <div className='w-75 border shadow row my-5' >
                    <div className="col-md-6 col-sm-12">
                        <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?t=st=1727248976~exp=1727252576~hmac=68bab54f553e497ba5f7cd952b26ff7849f28530499a8f29899f8f9d1c0ba7bd&w=1060" alt="" width={'100%'} />
                    </div>
                    <div className="col-md-6 col-sm-12 p-5">
                        {
                            authStatus ?
                                <h2>User Registration</h2>
                                :
                                <h2>Login</h2>
                        }
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} placeholder="name@example.com" className='mt-5' />
                        </FloatingLabel>
                        {
                            authStatus &&
                            <FloatingLabel controlId="floatingPassword" label="Username" className='mb-3'>
                                <Form.Control type="text" value={user.username} placeholder="Password" onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
                            </FloatingLabel>
                        }
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" value={user.password} placeholder="Password" onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
                        </FloatingLabel>

                        <div className='d-grid'>
                            {
                                authStatus?
                                <button className='btn btn-secondary my-3' onClick={handleRegister}>Register</button>
                                :
                                <button className='btn btn-success my-3' onClick={handleLogin}>Login</button>
                            }
                            {
                                authStatus?
                                <button className='btn btn-warning' onClick={changeAuth}>Already a user?</button>
                                :
                                <button className='btn btn-info' onClick={changeAuth}>New User?</button>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Auth