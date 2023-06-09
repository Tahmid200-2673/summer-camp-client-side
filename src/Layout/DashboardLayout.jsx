import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashBoardNav from '../pages/DashBoard/DashBoardNav';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
   <Row>
    <Col sm={3} className='bg-warning rounded my-5' style={{height: "50rem"}}>
     <DashBoardNav></DashBoardNav>
    </Col>
    <Col sm={9}>
      <Outlet /> 
    </Col>
  </Row>
        </div>
    );
};

export default DashboardLayout;