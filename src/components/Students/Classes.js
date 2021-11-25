import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import TableC from "../forms/ClassesTable";
import GradesTable from "../forms/GradesTable";
import UserRoute from "../../routes/UserRoute";

const Classes = (props) => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { user } = state;
  const { name, role } = user;
  const [courses, setCourses] = useState([]);
  const [ok, setOk] = useState(false);
  const [grade, setGrade] = useState({
    attendance: { mark: 0, percentage: 0 },
    midterm: { mark: 0, percentage: 0 },
    project: { mark: 0, percentage: 0 },
    final: { mark: 0, percentage: 0 },
    total: { mark: 0, percentage: 100 },
  });
  const { total } = grade;

  const [code, setCode] = useState("");
  const dName = props.match.params.name;
  useEffect(() => {
    const getMyCourses = async () => {
      const name2search = role === "Student" ? name : dName;
      const { data } = await axios.get(`/api/classes/${name2search}/Yes`);
      setCourses(data.map(({ course }) => course));
    };
    state && getMyCourses();
  }, [state]);

  const showGrades = async (code) => {
    setOk(true);
    setCode(code);
    const course = courses.filter((course) => course.code === code);

    const { grades } = course[0];
    setGrade(grades);
  };

  return (
    <UserRoute>
      {courses && courses.length > 0 ? (
        <>
          <div className="container">
            {role === "Student" ? (
              <h1> Here is a list of your classes</h1>
            ) : (
              <h1> Here is a list of {dName}'s classes</h1>
            )}

            <div className="py-3">
              <TableC courses={courses} showGrades={showGrades} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Modal
                title={
                  role === "Student"
                    ? `Your ${code} grades`
                    : `${dName}'s ${code} grades`
                }
                visible={ok}
                onCancel={() => setOk(false)}
                footer={null}
              >
                <>
                  <GradesTable grade={grade} total={total} />
                </>
              </Modal>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <h4>
              You have not registered any course yet. Please register{" "}
              <Link to="/register-courses">Here</Link>
            </h4>
          </div>
        </>
      )}
    </UserRoute>
  );
};

export default Classes;
