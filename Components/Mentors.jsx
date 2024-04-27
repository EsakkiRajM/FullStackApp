import { useContext, useEffect } from "react";
import { StateContext } from "../src/App";
import axios from "axios";
import CreateMentorForm from "./CreateMentorForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Mentors = () => {

  const { isMentorFormShow, setIsMentorFormShow, mentors, setMentors, fetchMentorId, setFetchMentorId } = useContext(StateContext);

  const navigate = useNavigate();

  //console.log(fetchMentorId, "fetchMentorId");

  //    console.log(isStudentFormShow, "student");

  //console.log(students);

  const handleFetchMentors = async () => {
    try {
      const response = await axios.get(`${url}/getmentors`);
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleFetchMentors(); // Fetch students on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  const handleCreateMentors = () => {
    setIsMentorFormShow(true);
  }

  const url = import.meta.env.VITE_BE_URL;

  const handleAssignStudent = (mentorId) => {
    console.log(mentorId);
    navigate(`/assignstudents/${mentorId}`);
    //setFetchMentorId(mentorId);
  }

  return (
    <div>
      <div>
        <div>
          <div className='text-center mt-1'>
            <button className='btn btn-dark ' onClick={handleCreateMentors}> <span className='m-5'>Create Mentor</span> </button>
          </div>
          <div>
            {isMentorFormShow && <CreateMentorForm handleFetchMentors={handleFetchMentors} />}
          </div>
          <div>
            <div className='table-responsive mt-3'>
              <table className='table table-bordered table-info table-striped'>
                <thead>
                  <tr className='text-center'>
                    <th scope="col">S.No</th>
                    <th scope="col">Mentor Name</th>
                    <th scope="col">Course</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                {
                  mentors.map((mentors, index) => {
                    return <tbody key={index}>
                      <tr className='text-center'>
                        <th scope="row"> {index + 1} </th>
                        <td> {mentors.mentorname} </td>
                        <td> {mentors.course} </td>
                        <td className='text-center'> <button className='btn btn-info'
                          onClick={() => { handleAssignStudent(mentors._id) }}>
                          <FontAwesomeIcon icon={faPen} />
                        </button> </td>

                      </tr>
                    </tbody>

                  })

                }
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Mentors;