import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrow90DegLeft } from "react-icons/bs";

const IClasses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getInstCourses();
  }, []);
  const getInstCourses = async () => {
    const { data } = await axios.get(
      `https://myuniversitymu.herokuapp.com/api/courses/instructor/${state.user.name}`
    );
    setCourses(data);
  };
  const showStudents = async (code) => {
    window.location = `https://myuniversitymu.herokuapp.com/instructor-students/${code}`;
  };

  return (
    <>
      {state && state.user && state.user.name && (
        <>
          {courses.length > 0 ? (
            <>
              <h1> Here is a list of your Classes</h1>

              <div className="container">
                <div className="row ">
                  <div className="py-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Course Code</th>
                          <th>Course Name</th>
                          <th>Time</th>
                          <th>Credits</th>
                          <th>Major</th>
                          <th>View Students</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(
                          ({ code, name, time, credits, major }, index) => {
                            return (
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{code}</td>
                                <td>{name}</td>
                                <td>{time}</td>
                                <td>{credits}</td>
                                <td>{major}</td>

                                <td>
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
          ) : (
            <h1>You don't have any student</h1>
          )}
        </>
      )}
    </>
  );
};

export default IClasses;
