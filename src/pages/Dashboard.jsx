import React, { useEffect, useState,useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { projectListApi,dltProjectApi } from '../services/allApis'
import {addprojectResponseContext,editProjectResponseContext} from '../context/Contextapi'
import { toast } from 'react-toastify'

function Dashboard() {

  const [data, setData] = useState([])

  const {addResponse} = useContext(addprojectResponseContext)
  const {editResponse} = useContext(editProjectResponseContext)

  useEffect(() => {
    getData()
  }, [addResponse,editResponse])

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const res = await projectListApi(header)
    console.log(res)

    if (res.status == 200) {
      setData(res.data)
    }
    else {
      console.log(res)
    }
  }

  const handleDelete = async(id)=>{
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await dltProjectApi(id,header)

    if(res.status==200){
      toast.success("Project deleted!!")
      getData()
    }
    else{
      toast.warning("Something went wrong!!")
    }
  }

  return (
    <>
      <Header />
      <div className='container-fluid p-5'>
        <h2 className='text-center mb-3'>User Projects</h2>
        <Row>
          <Col sm={12} md={8}>
            <Add />
            <div className='pe-5 py-5'>

              {
                data ?. length > 0 ?
                  <>
                    {
                      data?.map(item => (
                        <div className='d-flex justify-content-between p-3 mb-3 border shadow'>
                          <h4>{item.title}</h4>
                          <div>
                            <a href={item.github} target='_blank' className='btn'><i className="fa-brands fa-github fa-lg" style={{ color: "#424f67", }} /></a>
                            <Edit project={item}/>
                            <button className='btn' onClick={()=>{handleDelete(item._id)}}><i className="fa-solid fa-trash fa-lg" style={{ color: "#c02148", }} /></button>
                          </div>
                        </div>
                      ))
                    }
                  </>
                  :
                  <h3>No projects added yet!!</h3>
              }
              
            </div>
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard