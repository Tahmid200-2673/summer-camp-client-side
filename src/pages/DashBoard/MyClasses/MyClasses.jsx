import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { AuthContext } from '../../../providers/AuthProvider';

const MyClasses = () => {
    const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);



useEffect(() => {
    if (!user?.email) {
      return;
    }
  
    fetch(`https://b7a12-summer-camp-server-side.vercel.app/classes?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data); 
  
        
        const instructorClasses = data.filter(classItem => classItem.instructorEmail === user.email);
  
        setClasses(instructorClasses);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user?.email]);
  

  return (
    <div>
      <h1>My Classes</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Status</th>
            <th>Total Enrolled Students</th>
            <th>Feedback</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(classItem => (
            <tr key={classItem.id}>
              <td>{classItem.className}</td>
              <td>{classItem.status}</td>
              <td>{classItem.enrolledStudents}</td>
             
              <td>
                { classItem.feedback }
              </td>
              <td>
                <Button>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyClasses;
