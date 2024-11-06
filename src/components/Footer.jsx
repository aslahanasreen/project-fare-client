import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div className='container-fluid p-5 bg-success'>
            <Row>
                <Col sm={12} md={5}>
                    <h4 className='text-dark'>Project Fair</h4>
                    <p style={{textAlign:'justify'}} className='text-dark'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit modi dicta sed necessitatibus, doloribus ab sunt laborum nobis numquam, qui quis voluptatem rem odio esse aut aliquam quaerat ex nemo.</p>
                </Col>
                <Col sm={12} md={2}>
                    <h4 className='text-dark'>Links</h4>
                    <div className='d-flex flex-column '>
                        <Link to={'/'} className='text-dark'>Landing</Link>
                        <Link to={'/auth'} className='text-dark'>Login</Link>
                        <Link to={'/allp'} className='text-dark'>Projects</Link>
                    </div>
                </Col>
                <Col sm={12} md={5}>
                    <h4 className='text-dark'>Feedback</h4>
                    <input type="text" className='form-control my-3'/>
                    <button className='btn btn-warning'>Send</button>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default Footer