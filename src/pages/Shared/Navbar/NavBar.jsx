import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import logo2 from '../../../assets/logo2.jpg';
import { AuthContext } from '../../../providers/AuthProvider';

const NavBar = () => {
    const {user, roleLogOut}=useContext(AuthContext);

    const functionLogOut = () => {
      roleLogOut()
          .then(() => { })
          .catch(error => console.log(error));
  }
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
            <Nav.Link href="/instructors">Instructors</Nav.Link>
            <Nav.Link href="/classes">Classes</Nav.Link>
           {
            user ? <>
             <Nav.Link href="/dashboard">Dashboard</Nav.Link>
             <Button onClick={functionLogOut} variant="secondary" className='mx-5'>Logout</Button>{' '}
            </> : <>
            <Nav.Link href="/login">Login</Nav.Link>
            </>
           }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

