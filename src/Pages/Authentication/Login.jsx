import React from 'react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    email: '',
    password: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
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
      const response = await fetch('https://task-backend-n37l.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save the JWT token
        navigate('/calendar'); // Redirect to the calendar page after successful login
      } else {
        setErrors({ submit: data.message || 'Login failed' });
      }
    } catch (err) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Field */}
              <div className="input-group">
                <FaEnvelope className="icon" />
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              
              {/* Password Field */}
              <div className="input-group">
                <FaLock className="icon" />
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              
              {/* General Error Message */}
              <ErrorMessage name="submit" component="div" className="error-message" />
              
              {/* Submit Button */}
              <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              
              {/* Register link */}
              <div className="register-link">
                <span>New user? </span>
                <button type="button" onClick={() => navigate('/register')} className="register-btn">
                  Register here
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
