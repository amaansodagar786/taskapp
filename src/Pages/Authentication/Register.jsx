import React from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.scss';



const Register = () => {
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch('https://task-backend-n37l.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please login.');
        navigate('/login'); // Redirect to login page
      } else {
        setErrors({ submit: data.message || 'Registration failed' });
      }
    } catch (err) {
      setErrors({ submit: 'An error occurred. Please try again.' });
      console.error('Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <FaUser className="icon" />
                <Field type="text" name="username" placeholder="Username" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <FaEnvelope className="icon" />
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <FaLock className="icon" />
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <ErrorMessage name="submit" component="div" className="error-message" />
              <button type="submit" className="register-button" disabled={isSubmitting} >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;