import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase char.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase char.')
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      'Password must contain at least 1 number or special char (@, !, #, etc).'
    )
    .required('Password is required'),
});

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:26429/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token);
        const token = localStorage.getItem('token');
        console.log(token);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      // If validation passes, continue with login logic
      handleLogin();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // If validation fails, update the errors state with the validation errors
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="background-image">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6} className="form-container">
            <div className="form-header"> Login </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button className="custom-button" type="submit">
                Login
              </Button>
            </Form>
            <div className="form-subtext">Don't have an account? Sign up!</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
