import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CheckoutFrom from './CheckoutFrom';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../hooks/useCart';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [cart] = useCart();
    const {id}= useParams();
    const item = cart.find(i=>i._id == id)
    // console.log(id);
    // console.log('cart', cart);
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(item?.price);
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-center mb-4">Payment</h1>
           <Elements stripe={stripePromise}>
                <CheckoutFrom cart={item} price={price}></CheckoutFrom>
            </Elements> 
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
