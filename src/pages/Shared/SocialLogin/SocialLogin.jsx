import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import {  FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {roleGoogleSignIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const functionGoogle = () => {
        roleGoogleSignIn()
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate(from, { replace: true })
        })
        .catch(error => {
            console.log(error)
        })
    } 
    return (
        <div>
             <div className='text-center'>
             <Button onClick={functionGoogle} variant="dark">Sign In with Google <FaGoogle /> </Button>
             </div>
        </div>
    );
};

export default SocialLogin;