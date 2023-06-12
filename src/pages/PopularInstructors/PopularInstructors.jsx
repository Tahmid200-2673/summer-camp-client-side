import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './PopularInstructors.css';

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchPopularInstructors = async () => {
      try {
        const response = await fetch('https://b7a12-summer-camp-server-side.vercel.app/users/instructors');
        const data = await response.json();


        const topInstructors = data.slice(0, 6);

        setInstructors(topInstructors);
      } catch (error) {
        console.error('Error fetching popular instructors:', error);
      }
    };

    fetchPopularInstructors();
  }, []);

  return (
    
    <div className='my-5'>
     <h1 className='text-center p-instructors-heading'>Popular Instructors</h1>
    <Row className='justify-content-center'>
      {instructors.length > 0 ? (
        instructors.map((instructor) => (
          <Col key={instructor.id} sm={6} md={6} lg={3} className='mb-4'>
            <Card className='instructor-card p-2' style={{ width: '18rem', height: '100%' }}>
              <Card.Img
                variant='top'
                src={instructor.photoURL}
                alt={instructor.name}
                style={{ height: '10rem', objectFit: 'cover' }}
              />
              <Card.Body className='text-center'>
                <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {instructor.name}
                </Card.Title>
                <Card.Text style={{ color: '#777', fontSize: '0.9rem' }}>{instructor.email}</Card.Text>
              </Card.Body>
              <Card.Footer className='text-muted'>
           
              </Card.Footer>
            </Card>
          </Col>
        ))
      ) : (
        <p>No popular instructors available.</p>
      )}
    </Row>
  </div>
   
   
  );
};

export default PopularInstructors;
