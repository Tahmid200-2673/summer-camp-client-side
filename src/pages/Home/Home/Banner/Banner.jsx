import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Banner.css'
import img1 from '../../../../assets/Banner/img1.jpg'
import img6 from '../../../../assets/Banner/img6.jpg'
import img3 from '../../../../assets/Banner/img3.jpg'

const Banner = () => {
    return (
        <Carousel >
      <div className="b-slide">
        <img src={img1}  className="b-img"/>
        <div className="b-caption">
          <h2 className="b-title">Summer Sports Camp</h2>
          <p className="b-description">Experience the thrill of sports this summer</p>
        </div>
      </div>
      <div className="b-slide">
        <img src={img6}  />
        <div className="b-caption">
          <h2 className="b-title">Academics Enrichment Camp</h2>
          <p className="b-description">Sharpen your mind with exciting academic activities</p>
        </div>
      </div>
      <div className="b-slide">
        <img src={img3}  />
        <div className="b-caption">
          <h2 className="b-title">Summer Camp Fun</h2>
          <p className="b-description">Join us for an unforgettable summer adventure</p>
        </div>
      </div>
    </Carousel>
    );
};

export default Banner;