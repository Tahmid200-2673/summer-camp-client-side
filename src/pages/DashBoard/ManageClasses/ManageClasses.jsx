import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
       try {
        const response = await fetch('http://localhost:5000/classes');
        const data = await response.json();
        setClasses(data);

    
      } catch (error) {
        console.error(error);
   }
   };

    fetchClasses();
   }, []);

 
  
  
  useEffect(() => {
    const disabledButtonsString = localStorage.getItem('disabledButtons');
    if (disabledButtonsString) {
      const disabledButtonsArray = JSON.parse(disabledButtonsString);
      setDisabledButtons(disabledButtonsArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('disabledButtons', JSON.stringify(disabledButtons));
  }, [disabledButtons]);
  

  const approveClass = async (classId) => {
    try {
      await fetch(`http://localhost:5000/classes/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      updateClassStatus(classId, 'approved');
    } catch (error) {
      console.error(error);
    }
  };

  const denyClass = async (classId) => {
    try {
      await fetch(`http://localhost:5000/classes/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'denied' }),
      });
      updateClassStatus(classId, 'denied');
    } catch (error) {
      console.error(error);
    }
  };
  
  const sendFeedback = async (classId) => {
    try {
      await fetch(`http://localhost:5000/classes/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: feedback, status: selectedClass.status }),
      });
      updateClassFeedback(classId, feedback);
      updateClassStatus(classId, selectedClass.status);
      setFeedback('');
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const updateClassStatus = (classId, status) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) => {
        if (classItem._id === classId) {
          return { ...classItem, status };
        }
        return classItem;
      })
    );
  };

  const updateClassFeedback = (classId, feedback) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) => {
        if (classItem._id === classId) {
          return { ...classItem, feedback };
        }
        return classItem;
      })
    );
  };
  const handleApprove = (classItem) => {
    approveClass(classItem._id);
    
    setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, classItem._id]);
  };

  const handleDeny = (classItem) => {
    denyClass(classItem._id);
    
    setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, classItem._id]);
  };

  const handleSendFeedback = (classItem) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = (event) => {
    event.preventDefault();
    sendFeedback(selectedClass._id);
  };

  return (
    <div>
      <h1>Manage Classes</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
             
              <img src={classItem.classImage} alt="User" style={{ width: '100px', height: '100px' }}/>
              <td>{classItem.className}</td>
              <td>{classItem.instructorName}</td>
              <td>{classItem.instructorEmail}</td>
              <td>{classItem.availableSeats}</td>
              <td>{classItem.price}</td>
              <td>{classItem.status}</td>
              <td>
               
             
  <>
    <Button
      variant="success"
      onClick={() => handleApprove(classItem)}
      // disabled={classItem.status === 'approved'}
      disabled={disabledButtons.includes(classItem._id) || classItem.status === 'approved'}
    >
      Approve
    </Button>{' '}
    <Button
      variant="danger"
      onClick={() => handleDeny(classItem)}
      // disabled={classItem.status === 'denied'}
      disabled={disabledButtons.includes(classItem._id) || classItem.status === 'denied'}
    >
      Deny
    </Button>{' '}
  </>

                <Button variant="primary" onClick={() => handleSendFeedback(classItem)} className='mt-5 mx-2'>
                  Send Feedback
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitFeedback}>
            <Form.Group controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control as="textarea" rows={3} value={feedback} onChange={handleFeedbackChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageClasses;
