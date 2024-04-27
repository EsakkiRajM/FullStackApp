import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { StateContext } from '../src/App';

const CreateMentorForm = ({handleFetchMentors}) => {
  const { setIsMentorFormShow, setMentorFormState } = useContext(StateContext);
  const url = import.meta.env.VITE_BE_URL;


  return (
    <div>
      <div className='m-3'>
        <div className='bg-success'>
          <h4 className='text-center mt-3 text-white'>Create Students here</h4>
          <Formik
            initialValues={{
                mentorname: '',
                course: '',
            }}
            validate={(values) => {
              const errors = {};

              if (!values.mentorname) {
                errors.mentorname = 'Mentor Name is Required';
              }
              if (!values.course) {
                errors.course = 'course is Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await axios.post(`${url}/creatementors`, {
                    mentorname: values.mentorname,
                    course: values.course,
                });
                setSubmitting(false);
                resetForm();
                setMentorFormState({
                    mentorname: '',
                  course: '',
                });
              } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error (e.g., show error message)
                setSubmitting(false);
              }
              handleFetchMentors();
            }}
          >
            <Form>
              <div className='row m-3'>
                <div className='col-sm-6 col-12'>
                  <label htmlFor='mentorname' className='fs-5 text-white'>
                    Mentor Name:{' '}
                  </label>
                  <Field name='mentorname' id='mentorname' className='form-control' placeholder='Mentor Name' />
                  <ErrorMessage name='mentorname' component='div' className='text-warning' />
                </div>
                <div className='col-sm-6 col-12'>
                  <label htmlFor='course' className='fs-5 text-white'>
                    Course:{' '}
                  </label>
                  <Field name='course' id='course' className='form-control' placeholder='Course' />
                  <ErrorMessage name='course' component='div' className='text-warning' />
                </div>
              </div>
              <div className='text-center'>
                <button type='button' className='p-2 btn btn-dark my-3' onClick={() => setIsMentorFormShow(false)}>
                  Back
                </button>
                &nbsp;&nbsp;
                <button type='submit' className='p-2 btn btn-dark my-3'>
                  Create
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateMentorForm;
