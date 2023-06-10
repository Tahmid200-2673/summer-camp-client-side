

import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaBook, FaBroom, FaSuitcase, FaUser } from 'react-icons/fa';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const DashBoardNav = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div >
      <Nav className="flex-column">
       

        {isAdmin && (
          <>
            <Nav.Link href="/dashboard/manageclasses">
              <FaBook /> Manage Classes
            </Nav.Link>
            <Nav.Link href="/dashboard/manageusers">
              <FaUser /> Manage Users
            </Nav.Link>
          </>
        )}

        {isInstructor && (
          <>
            <Nav.Link href="/dashboard/addclass">
              <FaBroom /> Add a Class
            </Nav.Link>
            <Nav.Link href="/dashboard/myclasses">
              <FaBook /> My Classes
            </Nav.Link>
           
          </>
        )}

        {!isAdmin && !isInstructor && (
          <>
            <Nav.Link href="/dashboard/myselectedclasses">
              <FaBook /> My Selected Classes
            </Nav.Link>
            <Nav.Link href="/dashboard/myenrolledclasses">
              <FaSuitcase /> My Enrolled Classes
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default DashBoardNav;
