import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const ManageUsers = () => {
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const makeAdmin = user => {

    setDisabledButtons(prevButtons => [...prevButtons, `admin_${user._id}`]);
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.modifiedCount){
            refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
  }
  const makeInstructor = user => {

    setDisabledButtons(prevButtons => [...prevButtons, `instructor_${user._id}`]);
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.modifiedCount){
            refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} is an Instructor Now!`,
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
  }

  return (
    <div>
    <h1>User Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td><img src={user.photoURL} alt="User" style={{ width: '50px', height: '50px' }}/></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role || 'Student'}</td>

              <td>
                <Button
                  variant="primary"
                  disabled={disabledButtons.includes(`instructor_${user._id}`) || user.role === 'Instructor'}
                  onClick={() => makeInstructor(user)}
                  className='mx-5'
                >
                  Make Instructor
                </Button>
                <Button
                  variant="danger"
                  disabled={disabledButtons.includes(`admin_${user._id}`) || user.role === 'Admin'}
                  onClick={() => makeAdmin(user)}
                >
                  Make Admin
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};



export default ManageUsers;
