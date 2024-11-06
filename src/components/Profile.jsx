import React, { useState,useEffect,useContext } from 'react'
import { profileUpdateApi } from '../services/allApis'
import { toast } from 'react-toastify'
import baseUrl from '../services/baseUrl'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/Contextapi'

function Profile() {

    const [profile, setProfile] = useState(false)
    const [userData,setUserData] = useState({
        profile:"",username:"",github:"",linkedin:""
    })
    const [preview,setPreview] = useState("")
    const {authContextStatus,setAuthContextStatus} = useContext(authContext)

    const nav = useNavigate()

    useEffect(()=>{
        if(sessionStorage.getItem('username')){
            setUserData({...userData,username:sessionStorage.getItem('username'),github:sessionStorage.getItem('github'),
                linkedin:sessionStorage.getItem('linkedin'),profile:sessionStorage.getItem('profile')})
        }
    },[])

    useEffect(()=>{
        if(userData.profile && userData.profile.type){
            setPreview(URL.createObjectURL(userData.profile))
        }
        else{
            setPreview("")
        }
    },[userData.profile])

    const changeProfile = () => {
        setProfile(!profile)
    }

    const handleUpdate = async()=>{
        console.log(userData)
        const {username,github,linkedin,profile} = userData

        if(userData.profile.type){

            const fd = new FormData()
            fd.append("username",username)
            fd.append("github",github)
            fd.append("linkedin",linkedin)
            fd.append("profile",profile)

            const header = {
                "Content-Type" : "multipart/form-data",
                "Authorization":`Token ${sessionStorage.getItem('token')}`
            }

            const res =await profileUpdateApi(fd,header)
            console.log(res)
            if(res.status==200){
                toast.success("Profile Updated!")
                changeProfile()
                sessionStorage.clear()
                setAuthContextStatus(false)
                nav('/auth')
            }
            else{
                toast.error('Updation Failed!')
            }
        }
        else{
            const header = {
                "Content-Type" : "multipart/form-data",
                "Authorization":`Token ${sessionStorage.getItem('token')}`
            }

            const res =await profileUpdateApi(userData,header)
            console.log(res)
            if(res.status==200){
                toast.success("Profile Updated!")
                changeProfile()
                sessionStorage.clear()
                setAuthContextStatus(false)
                nav('/auth')
            }
            else{
                toast.error('Updation Failed!')
            }
        }
    }
    
    return (
        <>
            <div className='container-fluid'>
                {
                    profile ?
                        <div className='border border-warning p-5'>
                            <h5>Profile</h5>
                            <div>
                               <label>
                                    <input type="file" name="" onChange={(e)=>{setUserData({...userData,profile:e.target.files[0]})}} style={{ display: 'none' }} />
                                    <img src={preview?preview:sessionStorage.getItem('profile')?`${baseUrl}/uploads/${sessionStorage.getItem('profile')}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrBp4rAadRiXmk6NWl3redkvGJgWGDkBT4vA&s"}
                                        alt="" className='img-fluid mb-3' />
                               </label>

                                <input type="text" defaultValue={userData.username} className="form-control mb-3" placeholder='Username' onChange={(e)=>{setUserData({...userData,username:e.target.value})}}/>
                                <input type="text" defaultValue={userData.github} className="form-control mb-3" placeholder='Github URL' onChange={(e)=>{setUserData({...userData,github:e.target.value})}}/>
                                <input type="text" defaultValue={userData.linkedin} className="form-control mb-3" placeholder='LinkedIn URL' onChange={(e)=>{setUserData({...userData,linkedin:e.target.value})}}/>
                                <div className="d-flex justify-content-between">
                                    <button className='btn btn-success' onClick={handleUpdate}>update</button>
                                    <button className='btn btn-danger' onClick={changeProfile}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='d-grid'><button className='btn btn-primary' onClick={changeProfile}>Change User Profile</button></div>
                }


            </div>
        </>
    )
}

export default Profile