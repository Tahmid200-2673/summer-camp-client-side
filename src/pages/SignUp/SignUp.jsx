


import { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const { roleCreateUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const functionSignUp = (data) => {
    const { name, photoURL, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    roleCreateUser(data.email, data.password)
    .then(result => {

        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL)
            .then(() => {
                const saveUser = { name: data.name, email: data.email, photoURL: data.photoURL}
                fetch('https://b7a12-summer-camp-server-side.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            reset();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User creation successful',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })



            })
            .catch(error => console.log(error))
    })
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="w-75 border-0">
        <Card.Body>
          <h3 className="text-center">Register</h3>
          <Form onSubmit={handleSubmit(functionSignUp)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register("name", { required: true })} name="name" placeholder="Your Name" />
              {errors.name && <span className="text-danger">Name is required</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhotoURL">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control type="text" {...register("photoURL",{ required: true })} name="photoURL" placeholder="Photo URL" />
              {errors.photoURL && <span className="text-danger">Photo URL is required</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control {...register("email", { required: true })} type="email" name="email" placeholder="Enter email" />
              {errors.email && <span className="text-danger">Email is required</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*()])/
              })} name="password" placeholder="Password" />
              {errors.password?.type === 'required' && <p className="text-danger">Password is required</p>}
              {errors.password?.type === 'minLength' && <p className="text-danger">Password must be 6 characters</p>}
             
              {errors.password?.type === 'pattern' && (
                <p className="text-danger">Password must have one uppercase and one special character</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmPassword", { required: true })}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-danger">Confirm Password is required</span>}
              <br />
              {/* <Form.Text className="text-danger">{error}</Form.Text> */}
            </Form.Group>
            <div className="text-center">
              <Button className="btn btn-dark mx-5" variant="primary" type="submit" style={{ width: '19rem' }}>
                Register
              </Button>
              <br />
              <Form.Text className="text-secondary">
                Already Have an Account? <Link to="/login">Login</Link>
              </Form.Text>
            </div>
            
          </Form>
         <div className='mt-5'>
         <SocialLogin></SocialLogin>
         </div>
        </Card.Body>
      </Card>
     
    </Container>
  );
};

export default SignUp;
