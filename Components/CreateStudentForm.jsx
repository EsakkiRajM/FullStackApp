import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { StateContext } from '../src/App';

const CreateStudentForm = ({handleFetchStudents}) => {
  const { setIsStudentFormShow, setFormState } = useContext(StateContext);
  const url = import.meta.env.VITE_BE_URL;


  return (
    <div>
      <div className='m-3'>
        <div className='bg-success'>
          <h4 className='text-center mt-3 text-white'>Create Students here</h4>
          <Formik
            initialValues={{
              studentname: '',
              batch: '',
            }}
            validate={(values) => {
              const errors = {};

              if (!values.studentname) {
                errors.studentname = 'Student Name is Required';
              }
              if (!values.batch) {
                errors.batch = 'Batch No is Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await axios.post(`${url}/createstudents`, {
                  studentname: values.studentname,
                  batch: values.batch,
                });
                setSubmitting(false);
                resetForm();
                setFormState({
                  studentname: '',
                  batch: '',
                });
              } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error (e.g., show error message)
                setSubmitting(false);
              }
              handleFetchStudents();
            }}
          >
            <Form>
              <div className='row m-3'>
                <div className='col-sm-6 col-12'>
                  <label htmlFor='studentname' className='fs-5 text-white'>
                    Student Name:{' '}
                  </label>
                  <Field name='studentname' id='studentname' className='form-control' placeholder='Student Name' />
                  <ErrorMessage name='studentname' component='div' className='text-warning' />
                </div>
                <div className='col-sm-6 col-12'>
                  <label htmlFor='batch' className='fs-5 text-white'>
                    Batch No:{' '}
                  </label>
                  <Field name='batch' id='batch' className='form-control' placeholder='Batch No' />
                  <ErrorMessage name='batch' component='div' className='text-warning' />
                </div>
              </div>
              <div className='text-center'>
                <button type='button' className='p-2 btn btn-dark my-3' onClick={() => setIsStudentFormShow(false)}>
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

export default CreateStudentForm;
