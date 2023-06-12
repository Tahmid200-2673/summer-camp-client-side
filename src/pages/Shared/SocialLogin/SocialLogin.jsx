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
            const loggedInUser = result.user;
            console.log(loggedInUser);
            const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email ,photoURL: loggedInUser.photoURL}
                fetch('https://b7a12-summer-camp-server-side.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
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