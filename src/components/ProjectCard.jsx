import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import baseUrl from '../services/baseUrl';



function ProjectCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Card style={{ width: '18rem'}}>
                <Card.Img onClick={handleShow} style={{ cursor: 'pointer' }} variant="top" src={`${baseUrl}/uploads/${project.image}`} height={'150px'} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img src={`${baseUrl}/uploads/${project.image}`} alt="" width={'100%'}/>
                        </Col>
                        <Col>
                            <h5><span className='text-warning'>Description : </span>{project.description}</h5>
                            <p>
                                Languages : {project.languages}
                            </p>
                            <div className='d-flex justify-content-between'>
                                <a href={project.github}>
                                <i className="fa-brands fa-github" />
                                </a>
                                <a href={project.demo}>
                                <i className="fa-solid fa-link" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard