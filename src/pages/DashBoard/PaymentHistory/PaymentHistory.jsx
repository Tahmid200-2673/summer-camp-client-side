import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Image, ListGroup, Table } from 'react-bootstrap';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payments?email=${user?.email}`);
        const data = await response.json();
        
        const sortedData = data.sort((a, b) => b.date - a.date);
        setPaymentHistory(sortedData.reverse());
      } catch (error) {
        console.error('Error :', error);
      }
    };

    if (user?.email) {
      fetchPaymentHistory();
    }
  }, [user?.email]);

  return (
    <div>
    <h1>Payment History</h1>
    {paymentHistory.length > 0 ? (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor</th>
            <th>Instructor Email</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment._id}>
              <td>
                <img src={payment.classImage} alt="Class" style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{payment.className}</td>
              <td>{payment.instructorName}</td>
              <td>{payment.instructorEmail}</td>
              <td>{payment.price}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p>No payment history available.</p>
    )}
  </div>
  );
};

export default PaymentHistory;
