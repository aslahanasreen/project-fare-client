import React from 'react'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';
import {addprojectResponseContext} from '../context/Contextapi'

function Add() {

    const [show, setShow] = useState(false);
    const [project,setProject] = useState({
      title:"", description:"", languages:"", image:"", github:"", demo:""
    })
    const [preview,setPreview] = useState("")

    const {addResponse,setAddRespose} = useContext(addprojectResponseContext)

    useEffect(()=>{
      if(project.image){
        setPreview(URL.createObjectURL(project.image))
      }
      else{
        setPreview("")
      }
    },[project.image])

    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true);
      setProject({
        title:"", description:"", languages:"", image:"", github:"", demo:""            
      })
    }

    const handleAddProject = async()=>{
      console.log(project)
      const {title,description,languages,image,github,demo} = project

      if( !title || !description || !languages || !image || !github || !demo ){
        toast.warning("Enter valid data!!")
      }
      else{
        const fd = new FormData()

        fd.append("title",title)
        fd.append("description",description)
        fd.append("languages",languages)
        fd.append("image",image)
        fd.append("github",github)
        fd.append("demo",demo)

        const header = {
          'Content-Type':'multipart/form-data',
          'Authorization':`Token ${sessionStorage.getItem('token')}`
        }

        const res = await addProjectApi(fd,header)
        console.log(res)
        if(res.status==200){
          toast.success("Project added!!")
          handleClose()
          setAddRespose(res)
        }
        else{
          toast.error("Project adding failed")
        }
      }
    }

  return (
    <>
        <div>
            <button className='btn btn-warning' onClick={handleShow}>Add Projects{' '}
            <i className="fa-solid fa-plus fa-lg" />
            </button>
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <label>
                        <input type="file" onChange={(e)=>{setProject({...project,image:e.target.files[0]})}} style={{display:'none'}}/>
                        <img src={preview?preview:"https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"}
                         alt="" className='img-fluid'/>
                    </label>
                </Col>
                <Col>
                    <div>
                        <input type="text" onChange={(e)=>{setProject({...project,title:e.target.value})}} className='form-control mb-3' placeholder='Enter project title'/>
                        <input type="text" onChange={(e)=>{setProject({...project,description:e.target.value})}} className='form-control mb-3' placeholder='Enter Description'/>
                        <input type="text" onChange={(e)=>{setProject({...project,languages:e.target.value})}} className='form-control mb-3' placeholder='Enter languages used'/>
                        <input type="text" onChange={(e)=>{setProject({...project,github:e.target.value})}} className='form-control mb-3' placeholder='Enter Github link'/>
                        <input type="text" onChange={(e)=>{setProject({...project,demo:e.target.value})}} className='form-control mb-3' placeholder='Enter live link'/>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add