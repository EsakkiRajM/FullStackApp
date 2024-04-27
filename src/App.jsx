import React, { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from '../Components/Header';
import Dashboard from '../Components/Dashboard';
import Mentors from '../Components/Mentors';
import Student from '../Components/Student';
import AssignStudent from '../Components/AssignStudent';

export const StateContext = createContext();

const App = () => {

  const [students, setStudents] = useState([])
  const [isStudentFormShow, setIsStudentFormShow] = useState(false); // student.jsx and createstudentform.jsx
  const [formState, setFormState] = useState({
    studentname: "",
    batch: ""
  }); // createstudentform.jsx

  const [mentors, setMentors] = useState([])
  const [isMentorFormShow, setIsMentorFormShow] = useState(false); // student.jsx and createstudentform.jsx
  const [mentorFormState, setMentorFormState] = useState({
    mentorname: "",
    course: "",
    students: []
  }); // createstudentform.jsx

  const [assignStudentForm, setAssignStudentForm ] = useState(false);
  const [assignstudentFormState, setAssignstudentFormState] = useState({
    studentname: "",
    batch: ""
  })
  const [ fetchMentorId, setFetchMentorId ] = useState([]);



  //console.log(formState);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          children: [
            {
              path: "",
              element: <Student />
            },
            {
              path: "/mentors",
              element: <Mentors />
            },
            {
              path: "/assignstudents/:mentorId",
              element: <AssignStudent />
            }
          ]
        }
      ]
    }
  ])


  return (
    <div>
      <StateContext.Provider value={{
        students, setStudents,
        isStudentFormShow, setIsStudentFormShow,
        formState, setFormState,
        mentors, setMentors, 
        isMentorFormShow, setIsMentorFormShow,
        mentorFormState, setMentorFormState,
        assignStudentForm, setAssignStudentForm,
        assignstudentFormState, setAssignstudentFormState,
        fetchMentorId, setFetchMentorId
      }}>
        <RouterProvider router={router} />
      </StateContext.Provider>
    </div>
  )
}

export default App;