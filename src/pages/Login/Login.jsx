
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { roleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const toggle = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { email, password } = data;

    roleSignIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'Login Successful.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        navigate(from, { replace: true });
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '50rem' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-danger">Email is required</span>}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <div className="d-flex">
              <Form.Control
                 type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
              />
              
              <Button variant="secondary" onClick={toggle}>
                {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </Button>
             
            </div>
           
            <br />
                {errors.password?.type === 'required' && <p className="text-danger">Password is required</p>} 
          </Form.Group>

         <div className='w-100'>
         <Button  type="submit" className='mt-3 btn btn-dark'>
            Login
          </Button>
         </div>

          <p>
            Don't have an account? <a href="/signup">Register</a>
          </p>

          
         <SocialLogin></SocialLogin>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
