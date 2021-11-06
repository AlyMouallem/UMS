import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrow90DegLeft } from "react-icons/bs";
const ListStudents = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const handleDelete = async (code) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/courses/code/${code}`
    );
    toast.success(data.message);

    setCourses(courses.filter((course) => course.code !== code));
  };
  const getCourses = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/courses`);
    setCourses(data);
  };
  const showStudents = (code) => {
    window.location = `instructor-students/${code}`;
  };

  return (
    <>
      {courses && courses.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10 py-2">
                <h1>Below are all the Courses</h1>
                <table className="table ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Major</th>
                      <th>Instructor</th>
                      <th>Time</th>
                      <th>View students</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(
                      ({ name, code, major, instructor, time }, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{name}</td>
                            <td>{code}</td>
                            <td>{major}</td>
                            <td>{instructor}</td>
                            <td>{time}</td>
                            <td>
                              {" "}
                              {
                                <BsArrow90DegLeft
                                  onClick={() => showStudents(code)}
                                  style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                />
                              }
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(code)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListStudents;
