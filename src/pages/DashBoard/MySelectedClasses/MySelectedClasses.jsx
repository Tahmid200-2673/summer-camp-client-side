
import React from 'react';
import useCart from '../../../hooks/useCart';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MySelectedClasses = () => {
  const [cart, refetch] = useCart();

  const handleDeleteClass = item => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/carts/${item._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
        }
    })
  };

  const total = cart.reduce((sum, item) => item.price + sum, 0);

  return (
    <div className='mt-5'>
      <h1>My Selected Classes</h1>
      <h5>Total Items: {cart.length}, Total Price: {total}</h5>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.classItemId}>
              <td>
                <img src={item.classImage} alt="Class" style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{item.className}</td>
              <td>{item.instructorName}</td>
              <td>{item.availableSeats}</td>
              <td>{item.price}</td>
              <td>
                <div className="d-grid gap-2">
                  <Button variant="danger" onClick={() => handleDeleteClass(item)} className="mb-2">
                    Delete
                  </Button>
                <Link to="/dashboard/payment">  <Button variant="primary" className="mb-2 w-100">
                    Pay
                  </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MySelectedClasses;

