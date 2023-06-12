

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import f1 from '../../../assets/f1.jpg';
import f2 from '../../../assets/f2.jpeg';
import f3 from '../../../assets/f3.jpg';
import './FeaturedActivitiesSection.css';

const FeaturedActivitiesSection = () => {
  
  const featuredActivities = [
    {
      id: 1,
      name: 'Football',
      image: '/src/assets/f1.jpg',
      description: 'Learn football techniques and tactics from professional coaches. Suitable for all skill levels.',
    },
    {
      id: 2,
      name: 'Basketball',
      image: '/src/assets/f2.jpeg',
      description: 'Improve your basketball skills through drills, team games, and friendly competitions.',
    },
    {
      id: 3,
      name: 'Swimming',
      image: '/src/assets/f3.jpg',
      description: 'Enjoy swimming lessons and water activities in our state-of-the-art swimming facilities.',
    },
  ];

  return (
    <section className="featured-activities-section">
      <Container>
        <h2 className="section-heading text-center">Featured Activities</h2>
        <Row className="justify-content-center">
          {featuredActivities.map((activity) => (
            <Col key={activity.id} sm={6} md={6} lg={3} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="activity-card"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card>
                    <Card.Img variant="top" src={activity.image} alt={activity.name} />
                    <Card.Body>
                      <Card.Title className="activity-title">{activity.name}</Card.Title>
                      <Card.Text className="activity-description">{activity.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedActivitiesSection;

