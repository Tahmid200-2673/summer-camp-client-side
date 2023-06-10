import React, { useEffect, useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
// import { useAuth } from '../../hooks/useAuth';

const AddClass = () => {
  const { user } = useAuth(); 

  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    const form = event.target;
    const classes = {
      className: form.elements.className.value,
      classImage: form.elements.classImage.value,
      instructorName: user?.displayName || '',
      instructorEmail: user?.email || '',
      availableSeats: parseInt(form.elements.availableSeats.value),
      price: parseFloat(form.elements.price.value),
      status: 'pending'
    };
    console.log(classes);
  
    fetch('http://localhost:5000/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classes)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class Added',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error(error);
       
      });
  
    
    form.reset();
  };
  

  return (
    <div>
      <h1>Add Class</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Class Name:</FormLabel>
          <FormControl type="text" name="className" required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Class Image:</FormLabel>
          <FormControl type="text" name="classImage" required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Instructor Name:</FormLabel>
          <FormControl type="text" value={user?.displayName || ''} name="instructorName" readOnly />
        </FormGroup>
        <FormGroup>
          <FormLabel>Instructor Email:</FormLabel>
          <FormControl type="email" value={user?.email || ''} name="instructorEmail" readOnly />
        </FormGroup>
        <FormGroup>
          <FormLabel>Available Seats:</FormLabel>
          <FormControl type="number" name="availableSeats" required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Price:</FormLabel>
          <FormControl type="number" name="price" required />
        </FormGroup>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
};

export default AddClass;
