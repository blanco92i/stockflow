import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import authService from '../features/auth/authService';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../features/auth/authSlice';



const  Login = () => {
  const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  phone: Yup.string(),
  password: Yup.string().required('Password is required'),
  }).test('email-or-phone', 'Please provide either email or phone number', function(values) {
    const { email, phone } = values;
    return email || phone;
  });


  const dispatch = useDispatch();
  const {loading, isError, isAuthenticated} =useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      dispatch(login(values));
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/posscreen');
    }
  }, [isAuthenticated, navigate]);


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="text-center mb-4">StockFlow</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Or Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
}

export default Login;
