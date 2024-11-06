import { useEffect, useState } from 'react'
import React from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjectsApi } from '../services/allApis'

function Allprojects() {

  const [data,setData] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      getData()
    }
  },[])

  const getData = async()=>{
    const res = await allProjectsApi()

    if(res.status==200){
      setData(res.data)
    }
  }
 
  return (
    <>
      <Header/>
      <div className='container-fluid p-5' >
        <h2 className='text-center mb-3'>All Projects</h2>
        <div className='d-flex justify-content-around'>
          {
            data.length>0 ?
            data.map(item=>(
              <ProjectCard project={item}/>
            ))
            :
            <h3>Projects not available!!...check if you are logged in..!!</h3>
          }
        </div>
      </div>
    </>
  )
}

export default Allprojects