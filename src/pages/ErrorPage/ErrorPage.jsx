import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col className="text-center">
          <h1> Page Not Found</h1>
          <img src="https://i.ibb.co/StT8P8s/7465751.png" alt="Error" className="img-fluid" />
          <p>The page you are looking for does not exist.</p>
          <Button variant="primary" as={Link} to="/" style={{ backgroundColor: '#f76c6c', borderColor: '#f76c6c' }}>
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
