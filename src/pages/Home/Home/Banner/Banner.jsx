

import React from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../../../../assets/Banner/img1.jpg';
import img6 from '../../../../assets/Banner/img6.jpg';
import img3 from '../../../../assets/Banner/img3.jpg';
import './Banner.css';

const Banner = () => {
  return (
    <Carousel className='mt-5'>
      <Carousel.Item>
        <img className="d-block w-100 b-img" src={img1} alt="Slide 1" />
        <Carousel.Caption>
          <h2 className="b-title">Summer Sports Camp</h2>
          <p className="b-description">Experience the thrill of sports this summer</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 b-img" src={img6} alt="Slide 2" />
        <Carousel.Caption>
          <h2 className="b-title">Academics Enrichment Camp</h2>
          <p className="b-description">Sharpen your mind with exciting academic activities</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 b-img" src={img3} alt="Slide 3" />
        <Carousel.Caption>
          <h2 className="b-title">Summer Camp Fun</h2>
          <p className="b-description">Join us for an unforgettable summer adventure</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
