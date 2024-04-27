import { useContext, useEffect } from "react";
import { StateContext } from "../src/App";
import CreateStudentForm from '../Components/CreateStudentForm';
import axios from "axios";

const Student = () => {

    const { isStudentFormShow, setIsStudentFormShow, students, setStudents } = useContext(StateContext);

    //    console.log(isStudentFormShow, "student");

    //console.log(students);

    const handleFetchStudents = async () => {
        try {
          const response = await axios.get(`${url}/getstudents`);
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        handleFetchStudents(); // Fetch students on component mount
      }, []); // Empty dependency array ensures this effect runs only once

    const handleCreateStudents = () => {
        setIsStudentFormShow(true);
    }

    const url = import.meta.env.VITE_BE_URL;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${url}/getstudents`);
    //             setStudents(response.data);
    //             //console.log(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData(); // Call the fetchData function when the component mounts
    // }, []); // Empty dependency array ensures this effect runs only once

    //console.log(response);

    return (
        <div>
            <div>
                <div>
                    <div className='text-center mt-1'>
                        <button className='btn btn-dark ' onClick={handleCreateStudents}> <span className='m-5'>Create Students</span> </button>
                    </div>
                    <div>
                        {isStudentFormShow && <CreateStudentForm handleFetchStudents={handleFetchStudents} />}
                    </div>
                    <div>
                        <div className='table-responsive mt-3'>
                            <table className='table table-bordered table-info table-striped'>
                                <thead>
                                    <tr className='text-center'>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Batch No</th>
                                    </tr>
                                </thead>
                                {
                            students.map((student, index) => {
                                //console.log(book, "book");
                                return <tbody key={index}>
                                    <tr className='text-center'>
                                        <th scope="row"> {index + 1} </th>
                                        <td> {student.studentname} </td>
                                        <td> {student.batch} </td>
                                        {/* <td className='text-center'> <button className='btn btn-info'
                                            onClick={() => { handleEdit(book.id) }}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </button> </td>
                                        <td className='text-center'> <button className='btn btn-info'
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button> </td> */}
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

export default Student