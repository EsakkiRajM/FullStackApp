import React, { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from '../Components/Header';
import Dashboard from '../Components/Dashboard';
import Mentors from '../Components/Mentors';
import Student from '../Components/Student';

export const StateContext = createContext();

const App = () => {

const [student, setStudent ] = useState(false)

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
          }
        ]
      }
    ]
  }
])


  return (
    <div>
      <StateContext.Provider value={{student, setStudent}}>
        <RouterProvider router={router} />
      </StateContext.Provider>
    </div>
  )
}

export default App