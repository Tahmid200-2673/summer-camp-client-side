import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import logo2 from '../../../assets/logo2.jpg';
import { AuthContext } from '../../../providers/AuthProvider';
import ReactRoundedImage from 'react-rounded-image';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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

             <div className="d-flex align-items-center mx-5">
              <a id="my-anchor-element">
                <ReactRoundedImage
                  image={user.photoURL}
                  roundedColor="#FFFFFF"
                  imageWidth="50"
                  imageHeight="50"
                  roundedSize="13"
                  hoverColor="#A9A9A9"
                />
              </a>
              <Tooltip anchorSelect="#my-anchor-element" content={user.displayName} />
              <Button onClick={functionLogOut} variant="secondary" className='mx-5'>Logout</Button>{' '}
            </div>

           






            
            </> : <>
            <Nav.Link href="/login"><Button variant="secondary" className='mx-5'>Login</Button></Nav.Link>
            </>
           }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

