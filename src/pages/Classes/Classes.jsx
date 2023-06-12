
// import React, { useState, useEffect, useContext } from 'react';
// import { Button, Card } from 'react-bootstrap';
// import './Classes.css'; 
// import axios from 'axios';
// import { AuthContext } from '../../providers/AuthProvider';
// import useCart from '../../hooks/useCart';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import useAdmin from '../../hooks/useAdmin';
// import useInstructor from '../../hooks/useInstructor';

// const Classes = () => {
//   const {user} = useContext(AuthContext);
//   const [, refetch] = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [classes, setClasses] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [isAdmin] = useAdmin();
//   const [isInstructor] = useInstructor();

//   // useEffect(() => {
    
//   //   const fetchApprovedClasses = async () => {
//   //     try {
        
//   //       const response = await fetch('http://localhost:5000/classes/approved');
//   //       const data = await response.json();
//   //       setClasses(data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   fetchApprovedClasses();
//   // }, []);

//   useEffect(() => {
//     const fetchApprovedClasses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/classes/approved');
//         const data = response.data;
//         setClasses(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchApprovedClasses();
//   }, []);

//   const handleAddToCart = classItem => {

//    console.log(classItem)
//     if(user && user.email){
   
//    const cartItem = {
//     classItemId: classItem._id,
//     status: classItem.status,
//     price: classItem.price,
//     instructorName: classItem.instructorName,
//     instructorEmail: classItem.instructorEmail, 
//     feedback: classItem.feedback,
//     className: classItem.className,
//     classImage: classItem.classImage,
//     availableSeats: classItem.availableSeats,
//     email: user.email
//   };
//      fetch('http://localhost:5000/carts', {
//          method: 'POST',
//          headers: {
//             'content-type': 'application/json'
//          },
//          body: JSON.stringify(cartItem)
//      })
//      .then(res => res.json())
//      .then(data => {
//          if(data.insertedId){
//              refetch(); 
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                  title: 'Class selected',
//                  showConfirmButton: false,
//                 timer: 1500
//               })
//         }
//      })
//  }
//  else{
//      Swal.fire({
//         title: 'Please login to select a class',
//         icon: 'warning',
//         showCancelButton: true,
//          confirmButtonColor: '#3085d6',
//          cancelButtonColor: '#d33',
//          confirmButtonText: 'Login now!'
//        }).then((result) => {
//          if (result.isConfirmed) {
//            navigate('/login', {state: {from: location}})
//          }
//        })
//  }
//   };

//   return (
//     <div>
//       <h1 className='text-center'>Our Classes</h1>
//       <div className="card-container ">
//         {classes.map((classItem) => (
//           <Card key={classItem.id} style={{ width: '18rem', marginBottom: '1rem' }}>
//             <Card.Img variant="top" src={classItem.classImage} alt="Class" style={{ width: '18rem', height: '10rem' }}/>
//             <Card.Body>
//               <Card.Title>{classItem.className}</Card.Title>
//               <Card.Text>
//                 Instructor: {classItem.instructorName}
//                 <br />
//                 Available Seats: {classItem.availableSeats}
//                 <br />
//                 Price: {classItem.price}
//               </Card.Text>
//               <Button
//                 variant="primary"
//                 disabled={classItem.availableSeats === 0 || userRole === 'admin' || userRole === 'instructor'}
//                 onClick={() => handleAddToCart(classItem)}
//               >
//                 Select
//               </Button>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Classes;

import React, { useState, useEffect, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Classes.css'; 
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import useCart from '../../hooks/useCart';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const Classes = () => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [classes, setClasses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  useEffect(() => {
    const fetchApprovedClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/classes/approved');
        const data = response.data;
        setClasses(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchApprovedClasses();
  }, []);

  const handleAddToCart = classItem => {
    if (user && user.email) {
      const cartItem = {
        classItemId: classItem._id,
        status: classItem.status,
        price: classItem.price,
        instructorName: classItem.instructorName,
        instructorEmail: classItem.instructorEmail, 
        feedback: classItem.feedback,
        className: classItem.className,
        classImage: classItem.classImage,
        availableSeats: classItem.availableSeats,
        email: user.email
      };
      fetch('http://localhost:5000/carts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Class selected',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please login to select a class',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <h1 className='text-center'>Our Classes</h1>
      <div className="card-container ">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            style={{
              width: '18rem',
              marginBottom: '1rem',
              backgroundColor: classItem.availableSeats === 0 ? 'red' : 'white'
            }}
          >
            <Card.Img
              variant="top"
              src={classItem.classImage}
              alt="Class"
              style={{ width: '18rem', height: '10rem' }}
            />
            <Card.Body>
              <Card.Title>{classItem.className}</Card.Title>
              <Card.Text>
                Instructor: {classItem.instructorName}
                <br />
                Available Seats: {classItem.availableSeats}
                <br />
                Price: {classItem.price}
              </Card.Text>
      <Button
        variant="primary"
       disabled={
       classItem.availableSeats === 0 ||
        isAdmin ||
        isInstructor
        // ||
        //  !user
         }
        onClick={() => handleAddToCart(classItem)}
           >
            Select
        </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Classes;

