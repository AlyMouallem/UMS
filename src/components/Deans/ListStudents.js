import { useEffect, useState } from "react";
import axios from "axios";

import { useHistory } from "react-router";
import Faculty from "../forms/Faculty";

const ListStudents = () => {
  const [student, setStudent] = useState([]);
  const router = useHistory();
  useEffect(() => {
    const getInstructors = async () => {
      const { data } = await axios.get(`/api/students`);
      setStudent(data);
    };
    getInstructors();
  }, []);

  const showStudents = async (name) => {
    router.push(`/students-classes/${name}`);
  };

  return (
    <>
      {student && student.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-3"></div>
              <div>
                <h1>Below are all the students</h1>
                <Faculty people={student} showStudents={showStudents} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListStudents;
