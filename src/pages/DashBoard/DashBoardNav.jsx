

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaBook, FaBroom, FaHistory, FaPaypal, FaSuitcase, FaUser } from 'react-icons/fa';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DashBoardNav = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  // const navigate = useNavigate();
 

  
  return (
    <div className='text-center'>
      <Nav className="flex-column">
       

        {isAdmin && (
          <>
          <div className='text-center'><h3 >Admin Dashboard</h3></div>
          <hr />
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
           <div className='text-center'><h3 >Instructor Dashboard</h3></div>
          <hr />
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
          <div className='text-center'><h3 >Student Dashboard</h3></div>
          <hr />
            <Nav.Link href="/dashboard/myselectedclasses">
              <FaBook /> My Selected Classes
            </Nav.Link>
            <Nav.Link href="/dashboard/myenrolledclasses">
              <FaSuitcase /> My Enrolled Classes
            </Nav.Link>
            <Nav.Link href="/dashboard/paymenthistory">
              <FaHistory /> Payment History
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default DashBoardNav;
