import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Modal } from "antd";
import { toast } from "react-toastify";
import TableC from "../forms/ClassesTable";
import GradesTable from "../forms/GradesTable";
import { SyncOutlined } from "@ant-design/icons";
import InstructorRoute from "../../routes/Instructor";
const Students = (props) => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { user } = state;
  const { role } = user;
  const [courses, setCourses] = useState([]);
  const [ok, setOk] = useState(false);
  const [edit, setEdit] = useState(false);
  const [student, setStudent] = useState({
    student: "",
    code: "",
    instructor: "",
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
  const code = props.match.params.code;

  const router = useHistory();

  useEffect(() => {
    const getInstCourses = async () => {
      const { data } =
        role === "Instructor"
          ? await axios.get(
              `http://localhost:8000/api/instructor-classes/${state.user.name}/${code}`
            )
          : role === "Dean" &&
            (await axios.get(`http://localhost:8000/api/code-classes/${code}`));
      await setCourses(
        data.map(({ course, student }) => ({
          ...course,
          student: `${student.name}`,
        }))
      );
    };
    getInstCourses();
  }, [state.user.name, code, role]);

  const showGrades = async (grades, student, code, instructor) => {
    setOk(true);
    setGrade(grades);
    setStudent({ student, code, instructor });
  };
  const submitMarks = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/instructor-classes/${student.instructor}/${student.student}/${student.code}`,
        { ...grade, total: parseFloat(total) }
      );

      setOk(false);
      toast.success(data.message);
      router.go(0);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <InstructorRoute>
      {state && state.user && state.user.name && (
        <>
          {courses && courses.length > 0 ? (
            <>
              {role === "Instructor" ? (
                <h1> Here is a list of your {code} students</h1>
              ) : (
                <h1> Here is a list of {code} students</h1>
              )}

              <div className="container">
                <div className="row ">
                  <div className="col-md-2 col-sm-2"></div>
                  <div className="col-md-8 col-sm-8">
                    <TableC courses={courses} showGradesInst={showGrades} />
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
                        <GradesTable
                          grade={grade}
                          setGrade={setGrade}
                          total={total}
                          edit={edit}
                        />
                      </>
                    </Modal>
                  </div>
                </div>
              </div>
            </>
          ) : (
            courses.length === 0 && (
              <>
                <SyncOutlined className="spinner" />
              </>
            )
          )}
        </>
      )}
    </InstructorRoute>
  );
};

export default Students;
