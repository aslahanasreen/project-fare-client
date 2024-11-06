import React from 'react'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import baseUrl from '../services/baseUrl';
import { toast } from 'react-toastify';
import { editProjectApi } from '../services/allApis';
import { editProjectResponseContext } from '../context/Contextapi';

function Edit({project}) {

    const [show, setShow] = useState(false);
    const [data,setData] = useState({...project})
    const [preview,setPreview] = useState('')
    const {setEditResponse} = useContext(editProjectResponseContext)

    useEffect(()=>{
      if(data.image.type){
        setPreview(URL.createObjectURL(data.image))
      }
      else{
        setPreview('')
      }
    },[data.image])

    const handleUpdate = async() =>{
      console.log(data)

      const {title,description,languages,github,demo,image} = data

      if( !title || !description || !languages || !github || !demo || !image){
        toast.warning('Enter valid data!')
      }
      else{
        if(data.image.type){
          const fd = new FormData()
          fd.append('title',title)
          fd.append('description',description)
          fd.append('languages',languages)
          fd.append('github',github)
          fd.append('demo',demo)
          fd.append('image',image)

          const header = {
            'Content-Type':'multipart/form-data',
            'Authorization':`Token ${sessionStorage.getItem('token')}`
          }

          const res = await editProjectApi(fd,project._id,header)
          console.log(res)

          if(res.status==200){
            toast.success('Project Updated!!')
            handleClose()
            setEditResponse(res)
          }
        }
        else{
          const header = {
            'Content-Type':'application/json',
            'Authorization':`Token ${sessionStorage.getItem('token')}`
          }

          const res = await editProjectApi(data,project._id,header)
          console.log(res)

          if(res.status==200){
            toast.success('Project updated!!')
            handleClose()
            setEditResponse(res)
          }
          else{
            toast.error('Updation failed!')
          }
        }
      }
    }

    const handleClose = () => {
      setShow(false)
      setData({...project})
      setPreview('')
    };
    const handleShow = () => setShow(true);

  return (
    <>
        <button className='btn'><i className="fa-solid fa-square-pen fa-xl" style={{color: "#74C0FC",}} onClick={handleShow}/></button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <label>
                        <input type="file" onChange={(e)=>{setData({...data,image:e.target.files[0]})}} style={{display:'none'}}/>
                        <img src={preview?preview:`${baseUrl}/uploads/${project?.image}`}
                         alt="" className='img-fluid'/>
                    </label>
                </Col>
                <Col>
                    <div>
                        <input type="text" defaultValue={project?.title} onChange={(e)=>{setData({...data,title:e.target.value})}} className='form-control mb-3' placeholder='Enter project title'/>
                        <input type="text" defaultValue={project?.description} onChange={(e)=>{setData({...data,description:e.target.value})}} className='form-control mb-3' placeholder='Enter Description'/>
                        <input type="text" defaultValue={project?.languages} onChange={(e)=>{setData({...data,languages:e.target.value})}} className='form-control mb-3' placeholder='Enter languages used'/>
                        <input type="text" defaultValue={project?.github} onChange={(e)=>{setData({...data,github:e.target.value})}} className='form-control mb-3' placeholder='Enter Github link'/>
                        <input type="text" defaultValue={project?.demo} onChange={(e)=>{setData({...data,demo:e.target.value})}} className='form-control mb-3' placeholder='Enter live link'/>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit