


import useAuth from '../hooks/useAuth';
import useInstructor from '../hooks/useInstructor';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const InstructorRoute = ({ children }) => {
    
    const { user, loading } = useAuth();
     const [isInstructor,isInstructorLoading] = useInstructor();
    const location = useLocation();
     if(loading || isInstructorLoading){
         return <Spinner animation="border" variant="success" />
     }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
       
};

export default InstructorRoute;