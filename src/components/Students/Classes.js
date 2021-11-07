import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppstoreFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

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
  const { attendance, midterm, project, final, total } = grade;

  const [code, setCode] = useState("");
  useEffect(() => {
    const getMyCourses = async () => {
      const name2search = role === "Student" ? name : dName;
      const { data } = await axios.get(
        `http://localhost:8000/api/classes/${name2search}/Yes`
      );
      setCourses(data.map(({ course }) => course));
    };
    state && getMyCourses();
  }, [state]);

  const dName = props.match.params.name;

  const showGrades = async (code) => {
    setOk(true);
    setCode(code);
    const course = courses.filter((course) => course.code === code);

    const { grades } = course[0];
    setGrade(grades);
  };

  return (
    <>
      {courses && courses.length > 0 ? (
        <>
          {role === "Student" ? (
            <h1> Here are your courses</h1>
          ) : (
            <h1> Here are {dName}'s courses</h1>
          )}

          <div className="container ">
            <div className="py-3">
              <Table className="table">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Course Code</Th>
                    <Th>Course Name</Th>
                    <Th>Instructor</Th>
                    <Th>Time</Th>
                    <Th>Credits</Th>
                    <Th>Grades</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courses.map(
                    ({ code, name, instructor, time, credits }, index) => {
                      return (
                        <Tr key={code}>
                          <Th>{index + 1}</Th>
                          <Td>{code}</Td>
                          <Td>{name}</Td>
                          <Td>{instructor}</Td>
                          <Td>{time}</Td>
                          <Td>{credits}</Td>
                          <Td>
                            {
                              <AppstoreFilled
                                onClick={() => showGrades(code)}
                                style={{
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                              />
                            }
                          </Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
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
                  <Table className="table">
                    <Thead>
                      <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Percentage</Th>
                        <Th>Grade</Th>
                        <Th>Total=Grade x Percentage</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>1</Td>
                        <Td>Attendance</Td>
                        <Td>{attendance.percentage}%</Td>
                        <Td>{attendance.mark}</Td>
                        <Td>
                          {(
                            (attendance.mark * attendance.percentage) /
                            100
                          ).toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>2</Td>
                        <Td>Midterm</Td>
                        <Td>{midterm.percentage}%</Td>
                        <Td>{midterm.mark}</Td>
                        <Td>
                          {((midterm.mark * midterm.percentage) / 100).toFixed(
                            2
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>3</Td>
                        <Td>Project</Td>
                        <Td>{project.percentage}%</Td>
                        <Td>{project.mark}</Td>
                        <Td>
                          {((project.mark * project.percentage) / 100).toFixed(
                            2
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>4</Td>
                        <Td>Final</Td>
                        <Td>{final.percentage}%</Td>
                        <Td>{final.mark}</Td>
                        <Td>
                          {((final.mark * final.percentage) / 100).toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>5</Td>
                        <Td>Final Average</Td>
                        <Td colSpan="2">100%</Td>

                        <Td>{total}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
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
    </>
  );
};

export default Classes;
