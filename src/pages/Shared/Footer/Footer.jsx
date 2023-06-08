import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo2 from '../../../assets/logo2.jpg';
import './Footer.css'

const Footer = () => {
  return (
    <div className="container bg-dark text-light">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mt-5">
            <img
              src={logo2}
              alt="logo"
              className="f-logo mx-4"
              style={{ width: '100px', height: '100px' }}
            />
            <h5>Teamwork Sports</h5>
          </Col>
          <Col md={4} className="mb-4 mt-5">
            <h5 className="mx-5">Contact</h5>
            <p className="mx-5">Email: tahmid22673@gmail.com</p>
            <p className="mx-5">Phone: +880 173 347 2000</p>
          </Col>
          <Col md={4} className="mt-5 ">
            <h5 className="mx-5">Address</h5>
            <p className="mx-5">391/C, Khilgaon,</p>
            <p className="mx-5">Dhaka-1219</p>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3 mt-3 f-text">
        &copy; {new Date().getFullYear()} Teamwork Sports. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
