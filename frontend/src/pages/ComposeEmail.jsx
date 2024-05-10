import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Compose = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    recipients: Yup.string().required('Recipients are required'),
    subject: Yup.string().required('Subject is required'),
    body: Yup.string().required('Body is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/email', values);
      navigate('/c/inbox');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Compose Email</h1>
      <Formik
        initialValues={{
          recipients: '',
          subject: '',
          body: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Recipients</label>
              <Field type="text" name="recipients" />
              <ErrorMessage name="recipients" component="div" />
            </div>

            <div>
              <label>Subject</label>
              <Field type="text" name="subject" />
              <ErrorMessage name="subject" component="div" />
            </div>

            <div>
              <label>Body</label>
              <Field as="textarea" name="body" />
              <ErrorMessage name="body" component="div" />
            </div>

            {isSubmitting ? <div>Loading...</div> : null}

            <button type="submit" disabled={isSubmitting} >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Compose;
