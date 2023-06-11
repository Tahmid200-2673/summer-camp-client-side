

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Image, Table } from 'react-bootstrap';

const MyEnrolledClasses = () => {
  const { user } = useContext(AuthContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payments?email=${user?.email}`);
        const data = await response.json();
        setEnrolledClasses(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching enrolled classes:', error);
      }
    };

    fetchEnrolledClasses();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Enrolled Classes:</h2>
      {enrolledClasses.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Available Seats</th>
            </tr>
          </thead>
          <tbody>
            {enrolledClasses.map((item) => (
              <tr key={item.classItemId}>
                <td>
                  <Image src={item.classImage} alt="Class" style={{ width: '100px', height: 'auto' }} />
                </td>
                <td>{item.className}</td>
                <td>{item.instructorName}</td>
                <td>{item.availableSeats}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No enrolled classes found.</div>
      )}
    </div>
  );
};

export default MyEnrolledClasses;

