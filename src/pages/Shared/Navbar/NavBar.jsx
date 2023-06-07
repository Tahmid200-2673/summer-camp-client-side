import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo2 from '../../../assets/logo2.jpg';

const NavBar = () => {
    const user=0;
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <img
              src={logo2}
              alt="logo"
              className="f-logo mx-4"
              style={{ width: '40px', height: '40px' }}
            />
        <Navbar.Brand href="/">Teamwork Sports</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#instructors">Instructors</Nav.Link>
            <Nav.Link href="#classes">Classes</Nav.Link>
            {user ? (
              <>
                <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                <Nav.Link href="#profile">
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="profile-picture"
                  />
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="#login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

