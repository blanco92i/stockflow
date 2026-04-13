import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {register} from '../features/auth/authSlice';



const Register = () => {
   const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required')
  });

  const dispatch = useDispatch();
  const {isSuccess} =useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      dispatch(register(values));
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(isSuccess) {
      navigate('/login');
      toast.success('Registration successful! Please login.');
    }
  }, [isSuccess, navigate]);


  return (
    <div className='register-container'>
      <div className='container'>
        <div className='row'>
          <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <div className='col-md-6 offset-md-3'>
            <h2 className='text-center'>Register</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input 
                  type='text' 
                  className='form-control' 
                  id='name' 
                  name='name'
                  placeholder='Enter your name' 
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required 
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input 
                  type='email' 
                  className='form-control' 
                  id='email' 
                  name='email'
                  placeholder='Enter your email' 
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required 
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='phone' className='form-label'>Phone Number</label>
                <input 
                type='text' 
                className='form-control' 
                id='phone' 
                placeholder='Enter your phone number' required
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input 
                type='password' 
                className='form-control' 
                id='password' 
                placeholder='Enter your password' 
                required 
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
              </div>
              <button type='submit' className='btn btn-primary w-100'>Register</button>
            </form>
            <p className='text-center mt-3'>
              Already have an account? <a href='/login'>Login here</a>
            </p>
          </div>
          <ToastContainer position='bottom-right' autoClose={5000} />
          <div className='col-md-6 d-none d-md-block'>
            <img src='https://img.freepik.com/vecteurs-premium/illustration-du-concept-analyse-donnees-livraison-colis_999616-4208.jpg?semt=ais_hybrid&w=740&q=80' alt='Register' className='img-fluid' />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register