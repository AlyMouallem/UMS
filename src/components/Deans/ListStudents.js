import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Faculty from "../forms/Faculty";
import Filter from "../forms/Filter";
import DeanRoute from "../../routes/Dean";

const ListStudents = () => {
  const [student, setStudent] = useState([]);
  const [majors, setMajors] = useState([]);
  const [filter, setFilter] = useState(student);
  const [heading, setHeading] = useState("Below are all the students");

  const router = useHistory();

  useEffect(() => {
    const getInstructors = async () => {
      const { data } = await axios.get(`/api/students`);
      setStudent(data);
      setFilter(data);
      setMajors([...new Set(data.map(({ major }) => major))]);
    };
    getInstructors();
  }, []);

  const showStudents = async (name) => {
    router.push(`/students-classes/${name}`);
  };

  const handleClick = (item) => {
    if (item !== "All") {
      setFilter(student.filter(({ major }) => major === item));
      setHeading(`Below are all ${item} students`);
    } else {
      setFilter(student);
      setHeading("Below are all the students");
    }
  };

  return (
    <DeanRoute>
      {student && student.length > 0 && (
        <>
          <div className="container ">
            <h1>{heading}</h1>
            <div className="row">
              <div className="col-md-2 col-sm-2" style={{ paddingTop: "5%" }}>
                <h4>Filter by major</h4>
                <Filter items={majors} handleClick={handleClick} />{" "}
              </div>

              <div className="col-md-8 col-sm-8">
                <Faculty people={filter} showStudents={showStudents} />
              </div>
            </div>
          </div>
        </>
      )}
    </DeanRoute>
  );
};

export default ListStudents;
