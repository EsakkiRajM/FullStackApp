import React, { useContext, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { StateContext } from '../src/App';
import { useParams } from 'react-router-dom';
import "./AssignStudent.css"

const AssignStudent = () => {
  const { setAssignStudentForm, assignStudentForm, assignstudentFormState, setAssignstudentFormState,
    mentors, fetchMentorId, setFetchMentorId
  } = useContext(StateContext);
  const url = import.meta.env.VITE_BE_URL;
  const { mentorId } = useParams();

  console.log(fetchMentorId.students, "fetchMentorId");

  const mentorsName = () => {
    mentors.map((mentor) => {
      if (mentor._id === mentorId) {
        //console.log(mentor.mentorname);
        setFetchMentorId(mentor);
      }
    })
  }


  useEffect(() => {
    mentorsName();
  }, [])

  return (
    <div>
      <div className='text-center mt-1'>
        <button className='btn btn-dark ' onClick={() => {
          setAssignStudentForm(true)
        }}> <span className='m-5'>Assign Students</span> </button>
      </div>
      <div>         
            <h5>Mentor Name: { fetchMentorId.mentorname} </h5>
      </div>
      {assignStudentForm &&
        <div className='m-3'>
          <div className='bg-success'>
            <h4 className='text-center mt-3 text-white'>Assign Students</h4>
            <Formik
              initialValues={{
                assignstudentname: '',
              }}
              validate={(values) => {
                const errors = {};

                if (!values.assignstudentname) {
                  errors.assignstudentname = 'Student Name is Required';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await axios.post(`${url}/assignstudents`, {
                    mentorId,
                    students: values.assignstudentname,
                    //batch: values.batch,
                  });
                  setSubmitting(false);
                  resetForm();
                  setAssignstudentFormState({
                    studentname: '',
                    batch: '',
                  });
                } catch (error) {
                  console.error('Error submitting form:', error);
                  // Handle error (e.g., show error message)
                  setSubmitting(false);
                }
                //handleFetchStudents();
              }}
            >
              <Form>
                <div className='row m-3'>
                  <div className='col-12'>
                    <label htmlFor='studentname' className='fs-5 text-white'>
                      Student Name:{' '}
                    </label>
                    <Field name='assignstudentname' id='assignstudentname' className='form-control' placeholder='Student Name' />
                    <ErrorMessage name='assignstudentname' component='div' className='text-warning' />
                  </div>
                </div>
                <div className='text-center'>
                  <button type='button' className='p-2 btn btn-dark my-3' onClick={() => {
                    setAssignStudentForm(false)
                  }}>
                    Close
                  </button>
                  &nbsp;&nbsp;
                  <button type='submit' className='p-2 btn btn-dark my-3'>
                    Create
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>}
        <div>
          <div>
            <h6>Student Lists:  </h6>
          <ul>
          {
            fetchMentorId.students && 
            fetchMentorId.students.map((students, index) => {
              return <li id='lists' key={index}> {students} </li>
            })
          }
          </ul>
        </div>
        </div>
    </div>
  );
};


export default AssignStudent;