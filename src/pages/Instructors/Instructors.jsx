import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
  
    const fetchInstructors = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div>
    <h2>Instructors</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {instructors.map((instructor) => (
          <tr key={instructor.id}>
            <td>
              <img src={instructor.photoURL} alt="Instructor" style={{ width: '80px', height: '70PX' }} />
            </td>
            <td>{instructor.name}</td>
            <td>{instructor.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
     
  );
};

export default Instructors;
