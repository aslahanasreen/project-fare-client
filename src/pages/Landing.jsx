import React,{useState,useEffect} from 'react'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../services/allApis'

function Landing() {

    const [projects,setProjects] = useState([])

    useEffect(()=>{
        getData()
    },[])

    const getData = async()=>{
        const res= await allProjectsApi()
        console.log(res)
        
        if(res.status==200){
            setProjects(res.data)
        }
    }

  return (
    <>
        <div className='container-fluid p-5' style={{height:'80vh'}}>
            <Row>
                <Col md={6} sm={12} className='d-flex justify-content-center flex-column'>
                    <h2>Project Fare</h2>
                    <p style={{textAlign:'justify'}}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nisi iste, necessitatibus consequuntur similique quos ipsa expedita. Consequatur similique commodi nam eos incidunt fuga voluptate eligendi, quaerat non corrupti assumenda.
                    </p>
                    <div className='d-grid'>
                        <Link className='btn btn-warning' to={'/auth'}>Start to explore...</Link>
                    </div>
                </Col>
                <Col>
                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-homepage-illustration_23-2149243391.jpg?w=1480&t=st=1727246531~exp=1727247131~hmac=d77cf96b711f59562b291850d5cde0c6c89f1ca87228ce71ff7f8bd691d13445" alt="" height={'280px'} width={'600px'} className='img-fluid rounded'/>
                </Col>
            </Row>
        </div>

        <div className='p-5'>
            <h2 className='text-center'>Sample Projects</h2>
            <div className='d-flex justify-content-evenly align-items-center p-5'>
                {
                    projects.length>0?
                    projects.slice(0,3).map(item=>(
                        <ProjectCard project={item}/>
                    ))
                    :
                    <h1 className='text-danger text-center'>No Projects!!</h1>
                }
                
            </div>
            <div className="text-center">
                <Link to={'/allp'}>View More..</Link>
            </div>
          
        </div>
    </>

  )
}

export default Landing