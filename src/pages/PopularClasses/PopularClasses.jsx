import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './PopularClasses.css'

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchPopularClasses = async () => {
      try {
        const response = await fetch('https://b7a12-summer-camp-server-side.vercel.app/classes/approved');
        const data = await response.json();

        const sortedClasses = data.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
        const topClasses = sortedClasses.slice(0, 6);

        setClasses(topClasses);
      } catch (error) {
        console.error('Error fetching popular classes:', error);
      }
    };

    fetchPopularClasses();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center p-classes'>Popular Classes</h1>
      <Row className='justify-content-center'>
        {classes.length > 0 ? (
          classes.map((classItem) => (
            <Col key={classItem.id} sm={6} md={6} lg={3} className='mb-4'>
              <Card className='class-card p-2' style={{ width: '18rem', height: '100%' }}>
             
                <Card.Img variant='top' src={classItem.classImage} alt={classItem.className} style={{ height: '10rem', objectFit: 'cover' }} />
                <Card.Body className='text-center'>
                  <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {classItem.className}
                  </Card.Title>
                  <Card.Text style={{ color: '#777', fontSize: '0.9rem' }}>Enrolled Students: {classItem.enrolledStudents}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No popular classes available.</p>
        )}
      </Row>
    </div>
  );
};

export default PopularClasses;
