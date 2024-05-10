import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('/user/registration', {
        email: values.email,
        password: values.password,
      });
      navigate('/login');
    } catch (error) {
      setErrors({ general: 'Error registering user' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            {isSubmitting ? <div>Loading...</div> : null}
            {errors.general && <div>{errors.general}</div>}

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>

            <div>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
