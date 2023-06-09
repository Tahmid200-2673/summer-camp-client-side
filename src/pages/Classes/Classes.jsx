// import React, { useState, useEffect } from 'react';
// import { Button, Card } from 'react-bootstrap';

// const Classes = () => {
//   const [classes, setClasses] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     // Simulating fetching approved classes from an API
//     const fetchApprovedClasses = async () => {
//       try {
//         // Replace this with your API call to fetch approved classes
//         const response = await fetch('http://localhost:5000/classes/approved');
//         const data = await response.json();
//         setClasses(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchApprovedClasses();
//   }, []);

//   const handleSelect = (classId) => {
//     if (!isLoggedIn) {
//       alert('Please log in before selecting a course.');
//       return;
//     }

//     if (userRole === 'admin' || userRole === 'instructor') {
//       alert('You are logged in as an admin/instructor. Selecting courses is not allowed.');
//       return;
//     }

    
//     alert(`Course with ID ${classId} selected.`);
//   };

//   return (
//     <div>
//       <h1>Classes</h1>
//       {classes.map((classItem) => (
//         <Card  key={classItem.id} style={{ width: '18rem', marginBottom: '1rem' }}>
//             <Card.Img variant="top" src={classItem.classImage} alt="Class" />
//           <Card.Body>
//             <Card.Title>{classItem.className}</Card.Title>
//             <Card.Text>
//               Instructor: {classItem.instructorName}
//               <br />
//               Available Seats: {classItem.availableSeats}
//               <br />
//               Price: {classItem.price}
//             </Card.Text>
//             <Button
//               variant="primary"
//               disabled={classItem.availableSeats === 0 || userRole === 'admin' || userRole === 'instructor'}
//               onClick={() => handleSelect(classItem.id)}
//             >
//               Select
//             </Button>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Classes;
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Classes.css'; // Import the custom CSS file

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Simulating fetching approved classes from an API
    const fetchApprovedClasses = async () => {
      try {
        // Replace this with your API call to fetch approved classes
        const response = await fetch('http://localhost:5000/classes/approved');
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApprovedClasses();
  }, []);

  const handleSelect = (classId) => {
    if (!isLoggedIn) {
      alert('Please log in before selecting a course.');
      return;
    }

    if (userRole === 'admin' || userRole === 'instructor') {
      alert('You are logged in as an admin/instructor. Selecting courses is not allowed.');
      return;
    }

    alert(`Course with ID ${classId} selected.`);
  };

  return (
    <div>
      <h1>Classes</h1>
      <div className="card-container">
        {classes.map((classItem) => (
          <Card key={classItem.id} style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Img variant="top" src={classItem.classImage} alt="Class" style={{ width: '18rem', height: '10rem' }}/>
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
                disabled={classItem.availableSeats === 0 || userRole === 'admin' || userRole === 'instructor'}
                onClick={() => handleSelect(classItem.id)}
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
