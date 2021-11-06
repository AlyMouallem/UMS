import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
const AddCourses = () => {
  const [majors, setMajors] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [cstate, setcState] = useState({
    major: "",
    code: "",
    name: "",
    instructor: "",
    time: "",
    credits: 3,
  });

  const { major, code, name, instructor, time } = cstate;
  const [grades, setGrades] = useState({
    attendance: {
      percentage: 5,
      mark: 0,
    },
    midterm: {
      percentage: 35,
      mark: 0,
    },
    project: {
      percentage: 20,
      mark: 0,
    },
    final: {
      percentage: 40,
      mark: 0,
    },
    total: 0,
  });
  const { attendance, midterm, project, final } = grades;

  const sum =
    parseInt(attendance.percentage) +
    parseInt(midterm.percentage) +
    parseInt(project.percentage) +
    parseInt(final.percentage);

  useEffect(() => {
    state && getMajors() && getInstructors();
  }, [state]);
  const getMajors = async () => {
    try {
      const { data } = await axios.get(
        "https://myuniversitymu.herokuapp.com/api/majors"
      );

      setMajors(data.map((data) => data.name));
    } catch (err) {
      console.log(err);
    }
  };
  const getInstructors = async () => {
    try {
      const { data } = await axios.get(
        "https://myuniversitymu.herokuapp.com/api/instructors"
      );

      setInstructors(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sum !== 100) {
      toast.error(
        `Sum of the grade distribution must be equal to 100, it is ${sum} now. `
      );
    } else {
      try {
        const { data } = await axios.post(
          "https://myuniversitymu.herokuapp.com/api/courses",
          {
            cstate,
            grades: grades,
          }
        );
        toast.success(data.message);
        window.location = window.location;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      {state &&
      majors &&
      majors.length > 0 &&
      instructors &&
      instructors.length > 0 ? (
        <div className="container py-2">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h1>Add a course:</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="major" className="form-label">
                    Select major
                  </label>
                  <select
                    value={major}
                    onChange={(e) =>
                      setcState({ ...cstate, major: e.target.value })
                    }
                    placeholder="Select Major"
                    className="form-select"
                    id="major"
                    required
                  >
                    <option disabled hidden value="">
                      Select a major
                    </option>
                    {majors.map((majorr, index) => {
                      return (
                        <option key={index} value={majorr}>
                          {majorr}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="name" className="form-label">
                    Enter course name{" "}
                  </label>
                  <input
                    placeholder="Name"
                    required
                    className="form-control"
                    value={name}
                    onChange={(e) =>
                      setcState({ ...cstate, name: e.target.value })
                    }
                    type="text"
                    id="name"
                  />
                  <label htmlFor="code" className="form-label">
                    Enter course code
                  </label>
                  <input
                    placeholder="Code"
                    required
                    className="form-control"
                    value={code}
                    onChange={(e) =>
                      setcState({ ...cstate, code: e.target.value })
                    }
                    type="text"
                    id="code"
                  />

                  <label htmlFor="instructor" className="form-label">
                    Select instructor
                  </label>
                  <select
                    value={instructor}
                    onChange={(e) =>
                      setcState({ ...cstate, instructor: e.target.value })
                    }
                    placeholder="Select Instructor"
                    className="form-select"
                    id="instructor"
                    required
                  >
                    <option disabled hidden className="form-select" value="">
                      Select an instructor
                    </option>
                    {instructors.map(({ first_name, last_name }, index) => {
                      return (
                        <option
                          key={index}
                          value={`${first_name} ${last_name}`}
                        >
                          {`${first_name} ${last_name}`}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="time" className="form-label">
                    Enter course time
                  </label>
                  <input
                    placeholder="x{A-P}M - y{A-P}M"
                    required
                    className="form-control"
                    value={time}
                    onChange={(e) =>
                      setcState({ ...cstate, time: e.target.value })
                    }
                    type="text"
                    id="time"
                  />

                  <h1>Grade distribution:</h1>
                  <table className="table addcourse ">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Attendance</th>
                        <th>Midterm</th>
                        <th>Project</th>
                        <th>Final</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Percentage %</th>
                        <td>
                          <input
                            value={attendance.percentage}
                            type="number"
                            onChange={(e) =>
                              setGrades({
                                ...grades,
                                attendance: {
                                  ...attendance,
                                  percentage: e.target.value,
                                },
                              })
                            }
                            min={0}
                            max={100}
                            className="form-control form-control-sm mx-2"
                            style={{ width: "3.5rem" }}
                          />
                        </td>
                        <td>
                          <input
                            value={midterm.percentage}
                            type="number"
                            onChange={(e) =>
                              setGrades({
                                ...grades,
                                midterm: {
                                  ...midterm,
                                  percentage: e.target.value,
                                },
                              })
                            }
                            min={0}
                            max={100}
                            className="form-control form-control-sm"
                            style={{ width: "3.5rem" }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={project.percentage}
                            onChange={(e) =>
                              setGrades({
                                ...grades,
                                project: {
                                  ...project,
                                  percentage: e.target.value,
                                },
                              })
                            }
                            min={0}
                            max={100}
                            className="form-control form-control-sm"
                            style={{ width: "3.5rem" }}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: "3.5rem" }}
                            type="number"
                            value={final.percentage}
                            onChange={(e) =>
                              setGrades({
                                ...grades,
                                final: {
                                  ...final,
                                  percentage: e.target.value,
                                },
                              })
                            }
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button type="submit" className="btn btn-primary col-12">
                  Add Course
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default AddCourses;
