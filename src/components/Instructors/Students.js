import { useState, useEffect } from "react";
import axios from "axios";
import { AppstoreFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const Students = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { user } = state;
  const { name, role } = user;
  const [courses, setCourses] = useState([]);
  const [ok, setOk] = useState(false);
  const [edit, setEdit] = useState(false);
  const [student, setStudent] = useState({
    student: "",
    code: "",
  });
  const [grade, setGrade] = useState({
    attendance: { mark: 0, percentage: 0 },
    midterm: { mark: 0, percentage: 0 },
    project: { mark: 0, percentage: 0 },
    final: { mark: 0, percentage: 0 },
    total: 0,
  });
  const { attendance, midterm, project, final } = grade;
  const total =
    attendance.mark === 0 ||
    midterm.mark === 0 ||
    project.mark === 0 ||
    final.mark === 0
      ? 0
      : (
          (attendance.mark * attendance.percentage +
            midterm.mark * midterm.percentage +
            project.mark * project.percentage +
            final.mark * final.percentage) /
          100
        ).toFixed(2);
  const index = window.location.pathname.lastIndexOf("/");
  const code = window.location.pathname.slice(index + 1);

  useEffect(() => {
    const getInstCourses = async () => {
      const { data } =
        role === "Instructor"
          ? await axios.get(
              `http://localhost:8000/api/instructor-classes/${state.user.name}/${code}`
            )
          : role === "Dean" &&
            (await axios.get(`http://localhost:8000/api/code-classes/${code}`));

      setCourses(
        data.map(({ course, student }) => ({
          ...course,
          student: `${student.name}`,
        }))
      );
    };
    getInstCourses();
  }, []);

  const showGrades = async (grades, student, code) => {
    setOk(true);
    setGrade(grades);
    setStudent({ student, code });
  };
  const submitMarks = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/instructor-classes/${name}/${student.student}/${student.code}`,
        { ...grade, total: parseFloat(total) }
      );

      setOk(false);
      toast.success(data.message);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      {state && state.user && state.user.name && (
        <>
          {courses.length > 0 ? (
            <>
              {role === "Instructor" ? (
                <h1> Here is a list of your {code} students</h1>
              ) : (
                <h1> Here is a list of {code} students</h1>
              )}

              <div className="container">
                <div className="row ">
                  <div className="py-3">
                    <Table className="table">
                      <Thead>
                        <Tr>
                          <Th>#</Th>
                          <Th>Course Code</Th>
                          <Th>Course Name</Th>
                          <Th>Credits</Th>
                          <Th>Student</Th>
                          <Th>Major</Th>
                          <Th>Grades</Th>
                          <Th>Time</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {courses.map(
                          (
                            {
                              code,
                              name,
                              time,
                              credits,
                              student,
                              major,
                              grades,
                            },
                            index
                          ) => {
                            return (
                              <Tr key={index}>
                                <Th>{index + 1}</Th>
                                <Td>{code}</Td>
                                <Td>{name}</Td>
                                <Td>{credits}</Td>
                                <Td>{student}</Td>
                                <Td>{major}</Td>

                                <Td>
                                  {
                                    <AppstoreFilled
                                      onClick={() =>
                                        showGrades(grades, student, code)
                                      }
                                      style={{
                                        fontSize: "24px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  }
                                </Td>
                                <Td>{time}</Td>
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
                      title={`${student.code} grades for: ${student.student} `}
                      visible={ok}
                      onCancel={() => {
                        setOk(false);
                        setEdit(false);
                      }}
                      footer={
                        <>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => setEdit(!edit)}
                          >
                            Edit
                          </button>
                          <button
                            onClick={submitMarks}
                            className="btn btn-sm m-2 btn-success"
                            disabled={
                              attendance.mark > 100 ||
                              midterm.mark > 100 ||
                              project.mark > 100 ||
                              final.mark > 100
                            }
                          >
                            Submit
                          </button>
                        </>
                      }
                    >
                      <>
                        <Table className="Table">
                          <Thead>
                            <Tr>
                              <Th>#</Th>
                              <Th>Title</Th>
                              <Th>Percentage/100</Th>
                              <Th>Grade</Th>
                              <Th>Total=Grade x Percentage</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>1</Td>
                              <Td>Attendance</Td>
                              <Td>{attendance.percentage}%</Td>
                              {!edit ? (
                                <Td>{attendance.mark}</Td>
                              ) : (
                                <Td>
                                  <input
                                    onChange={(e) =>
                                      setGrade({
                                        ...grade,
                                        attendance: {
                                          ...attendance,
                                          mark: e.target.value,
                                        },
                                      })
                                    }
                                    value={attendance.mark}
                                    type="number"
                                    min={0}
                                    max={100}
                                    className="form-control form-control-sm"
                                  ></input>{" "}
                                </Td>
                              )}

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
                              {!edit ? (
                                <Td>{midterm.mark}</Td>
                              ) : (
                                <Td>
                                  <input
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      setGrade({
                                        ...grade,
                                        midterm: {
                                          ...midterm,
                                          mark: e.target.value,
                                        },
                                      })
                                    }
                                    value={midterm.mark}
                                    type="number"
                                    min={0}
                                    max={100}
                                  ></input>
                                </Td>
                              )}

                              <Td>
                                {(
                                  (midterm.mark * midterm.percentage) /
                                  100
                                ).toFixed(2)}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>3</Td>
                              <Td>Project</Td>
                              <Td>{project.percentage}%</Td>
                              {!edit ? (
                                <Td>{project.mark}</Td>
                              ) : (
                                <Td>
                                  <input
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      setGrade({
                                        ...grade,
                                        project: {
                                          ...project,
                                          mark: e.target.value,
                                        },
                                      })
                                    }
                                    value={project.mark}
                                    type="number"
                                    min={0}
                                    max={100}
                                  ></input>{" "}
                                </Td>
                              )}

                              <Td>
                                {(
                                  (project.mark * project.percentage) /
                                  100
                                ).toFixed(2)}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>4</Td>
                              <Td>Final</Td>
                              <Td>{final.percentage}%</Td>
                              {!edit ? (
                                <Td>{final.mark}</Td>
                              ) : (
                                <Td>
                                  <input
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      setGrade({
                                        ...grade,
                                        final: {
                                          ...final,
                                          mark: e.target.value,
                                        },
                                      })
                                    }
                                    value={final.mark}
                                    type="number"
                                    min={0}
                                    max={100}
                                  ></input>
                                </Td>
                              )}
                              <Td>
                                {(
                                  (final.mark * final.percentage) /
                                  100
                                ).toFixed(2)}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>5</Td>
                              <Td>Average</Td>
                              <Td colSpan="2">100%</Td>

                              <Td>{total}</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </>
                    </Modal>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1>You don't have any student</h1>
          )}
        </>
      )}
    </>
  );
};

export default Students;
