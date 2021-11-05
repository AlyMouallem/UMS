import { useState, useEffect } from "react";
import axios from "axios";
import { AppstoreFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { toast } from "react-toastify";

const Students = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { user } = state;
  const { name } = user;
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
    getInstCourses();
  }, []);
  const getInstCourses = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/instructor-classes/${state.user.name}/${code}`
    );

    setCourses(
      data.map(({ course, student }) => ({
        ...course,
        student: `${student.name}`,
      }))
    );
  };

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
      setTimeout(() => (window.location = window.location), 500);
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
              <h1> Here is a list of your {code} students</h1>

              <div className="container">
                <div className="row ">
                  <div className="py-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Course Code</th>
                          <th>Course Name</th>
                          <th>Credits</th>
                          <th>Student</th>
                          <th>Major</th>
                          <th>Grades</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
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
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{code}</td>
                                <td>{name}</td>
                                <td>{credits}</td>
                                <td>{student}</td>
                                <td>{major}</td>

                                <td>
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
                                </td>
                                <td>{time}</td>
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
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Title</th>
                              <th>Percentage/100</th>
                              <th>Grade</th>
                              <th>Total=Grade x Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Attendance</td>
                              <td>{attendance.percentage}%</td>
                              {!edit ? (
                                <td>{attendance.mark}</td>
                              ) : (
                                <td>
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
                                </td>
                              )}

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
                              {!edit ? (
                                <td>{midterm.mark}</td>
                              ) : (
                                <td>
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
                                </td>
                              )}

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
                              {!edit ? (
                                <td>{project.mark}</td>
                              ) : (
                                <td>
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
                                </td>
                              )}

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
                              {!edit ? (
                                <td>{final.mark}</td>
                              ) : (
                                <td>
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
                                </td>
                              )}
                              <td>
                                {(
                                  (final.mark * final.percentage) /
                                  100
                                ).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Average</td>
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
            <h1>You don't have any student</h1>
          )}
        </>
      )}
    </>
  );
};

export default Students;
