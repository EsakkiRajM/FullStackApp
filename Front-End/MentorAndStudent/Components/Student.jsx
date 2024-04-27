import { useContext } from "react";
import { StateContext } from "../src/App";

const Student = () => {

    const { student } = useContext(StateContext);

    console.log(student);

  return (
    <div>Student</div>
  )
}

export default Student