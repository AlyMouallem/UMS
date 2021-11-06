import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppstoreFilled } from "@ant-design/icons";
import { Modal } from "antd";

const Classes = () => {
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
  const { attendance, midterm, project, final, total } = grade;

  const [code, setCode] = useState("");
  useEffect(() => {
    state && getMyCourses();
  }, [state]);

  const index = window.location.pathname.lastIndexOf("/");
  const dName = window.location.pathname.slice(index + 1);
  console.log({ dName, index });
  const getMyCourses = async () => {
    const name2search = role === "Student" ? name : dName;
    const { data } = await axios.get(
      `http://localhost:8000/api/classes/${name2search}/Yes`
    );
    setCourses(data.map(({ course }) => course));
  };

  const showGrades = async (code) => {
    setOk(true);
    setCode(code);
    const course = courses.filter((course) => course.code === code);

    const { grades } = course[0];
    setGrade(grades);
  };
  var decodeURI = decodeURIComponent(dName);
  return (
    <>
      {courses && courses.length > 0 ? (
        <>
          {role === "Student" ? (
            <h1> Here are your courses</h1>
          ) : (
            <h1> Here are {decodeURI}'s courses</h1>
          )}

          <div className="container">
            <div className="row ">
              <div className="py-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                      <th>Time</th>
                      <th>Credits</th>
                      <th>Grades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(
                      ({ code, name, instructor, time, credits }, index) => {
                        return (
                          <tr key={code}>
                            <th>{index + 1}</th>
                            <td>{code}</td>
                            <td>{name}</td>
                            <td>{instructor}</td>
                            <td>{time}</td>
                            <td>{credits}</td>
                            <td>
                              {
                                <AppstoreFilled
                                  onClick={() => showGrades(code)}
                                  style={{
                                    fontSize: "24px",
                                    cursor: "pointer",
                                  }}
                                />
                              }
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Modal
                  title={
                    role === "Student"
                      ? `Your ${code} grades`
                      : `${decodeURI}'s ${code} grades`
                  }
                  visible={ok}
                  onCancel={() => setOk(false)}
                  footer={null}
                >
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Percentage</th>
                          <th>Grade</th>
                          <th>Total=Grade x Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Attendance</td>
                          <td>{attendance.percentage}%</td>
                          <td>{attendance.mark}</td>
                          <td>
                            {(
                              (attendance.mark * attendance.percentage) /
                              100
                            ).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Midterm</td>
                          <td>{midterm.percentage}%</td>
                          <td>{midterm.mark}</td>
                          <td>
                            {(
                              (midterm.mark * midterm.percentage) /
                              100
                            ).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Project</td>
                          <td>{project.percentage}%</td>
                          <td>{project.mark}</td>
                          <td>
                            {(
                              (project.mark * project.percentage) /
                              100
                            ).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Final</td>
                          <td>{final.percentage}%</td>
                          <td>{final.mark}</td>
                          <td>
                            {((final.mark * final.percentage) / 100).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Final Average</td>
                          <td colSpan="2">100%</td>

                          <td>{total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                </Modal>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container p-2">
            <h4>
              You have not registered any course yet. Please register{" "}
              <Link to="/register-courses">
                <span style={{ color: "red" }}>Here</span>
              </Link>
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default Classes;
