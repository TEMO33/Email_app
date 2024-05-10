import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('/user/login', values);
      navigate('/c/inbox');
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="text" name="email" className="form-input" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" className="form-input" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            {isSubmitting ? <div>Loading...</div> : null}

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              Log In
            </button>

            {errors.general && <div className="error-message">{errors.general}</div>}

            <div>
              Don't have an account? <Link to="/register" className="link">Register</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

