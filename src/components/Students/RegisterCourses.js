import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { AiOutlineMinus } from "react-icons/ai";

const RegisterCourses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { user } = state;
  const { major, name } = user;
  const [courses, setCourses] = useState([]);
  const [registered, setRegistered] = useState([]);

  const [credits, setCredits] = useState(0);

  useEffect(() => {
    state && getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/classes/${name}/No/`
      );
      await getRegistered();
      setCourses(data.map(({ course }) => course));
    } catch (err) {
      console.log(err);
    }
  };

  const getRegistered = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/classes/${name}/Yes/`
      );
      setCredits(data.length * 3);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = (code) => {
    setRegistered(
      registered.filter((course) => {
        const res = course.code !== code;
        return res;
      })
    );
    setCourses(
      courses.concat(
        registered.filter((course) => {
          return course.code === code;
        })
      )
    );
    setCredits(credits - 3);
  };
  const handleAdd = (code) => {
    setCourses(
      courses.filter((course) => {
        return course.code !== code;
      })
    );
    setRegistered(
      registered.concat(
        courses.filter((course) => {
          return course.code === code;
        })
      )
    );
    setCredits(credits + 3);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/classes/${name}/Yes`,
        {
          registered: registered.map(({ code }) => code),
        }
      );

      toast.success(data.message);
      // window.localStorage.setItem("auth", JSON.stringify(data.auth));

      setTimeout(() => (window.location = "/students-classes"), 2500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {courses && courses.length !== 0 && credits < 18 ? (
        <>
          <h1>Courses available for {major} students</h1>
          <h4 className="text-danger" style={{ textAlign: "center" }}>
            You are allowed to register a maximum total of 18 credits
          </h4>
          <div className="container">
            <div className="row ">
              <div className="col-1"></div>
              <div className="col-10 py-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                      <th>Time</th>
                      <th>Credits</th>
                      <th>Register</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(
                      ({ code, name, instructor, time, credits }, index) => {
                        return (
                          <tr key={index}>
                            <td>{code}</td>
                            <td>{name}</td>
                            <td>{instructor}</td>
                            <td>{time}</td>
                            <td>{credits}</td>
                            <td>
                              <IoMdAdd
                                style={{
                                  color: "darkGreen",
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleAdd(code)}
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>You have reached 18 credits. You cannot register more.</h1>
          <hr />
        </>
      )}
      <h4 style={{ textAlign: "center" }}>{credits} credits registered </h4>
      {registered && registered.length > 0 ? (
        <>
          {18 - credits > 0 && (
            <h1>You can register {18 - credits} credits more</h1>
          )}

          <div className="container">
            <div className="row ">
              <div className="col-1"></div>
              <div className="col-10 py-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                      <th>Time</th>
                      <th>Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registered.map(
                      ({ code, name, instructor, time, credits }, index) => {
                        return (
                          <tr key={index}>
                            <td>{code}</td>
                            <td>{name}</td>
                            <td>{instructor}</td>
                            <td>{time}</td>
                            <td>{credits}</td>
                            <td>
                              <AiOutlineMinus
                                style={{
                                  color: "red",
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleRemove(code)}
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <button
                  onClick={handleRegister}
                  className="btn btn-danger col-12"
                >
                  Submit
                </button>
              </div>

              <div className="col-1"></div>
            </div>
          </div>
        </>
      ) : (
        <h1>You can register {18 - credits} credits more</h1>
      )}
    </>
  );
};

export default RegisterCourses;
