import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { AiOutlineMinus } from "react-icons/ai";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useHistory } from "react-router";

const RegisterCourses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { user } = state;
  const { major, name } = user;
  const [courses, setCourses] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [credits, setCredits] = useState(0);
  const router = useHistory();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/classes/${name}/No/`
        );
        await getRegistered();
        setCourses(data.map(({ course }) => course));
      } catch (err) {
        toast.error("Error. Try again later.");
      }
    };
    getCourses();
  }, []);

  const getRegistered = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/classes/${name}/Yes/`
      );
      setCredits(data.length * 3);
    } catch (err) {
      toast.error("Error. Try again later.");
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

      router.push(`/students-classes/${name}`);
    } catch (err) {
      toast.error("Error. Try again later.");
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
                <Table className="table">
                  <Thead>
                    <Tr>
                      <Th>Course Code</Th>
                      <Th>Course Name</Th>
                      <Th>Instructor</Th>
                      <Th>Time</Th>
                      <Th>Credits</Th>
                      <Th>Register</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {courses.map(
                      ({ code, name, instructor, time, credits }, index) => {
                        return (
                          <Tr key={index}>
                            <Td>{code}</Td>
                            <Td>{name}</Td>
                            <Td>{instructor}</Td>
                            <Td>{time}</Td>
                            <Td>{credits}</Td>
                            <Td>
                              <IoMdAdd
                                style={{
                                  color: "darkGreen",
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleAdd(code)}
                              />
                            </Td>
                          </Tr>
                        );
                      }
                    )}
                  </Tbody>
                </Table>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </>
      ) : credits === 18 ? (
        <h1>You have reached 18 credits. You cannot register more.</h1>
      ) : (
        <h1>There are no courses to register.</h1>
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
                <Table className="table">
                  <Thead>
                    <Tr>
                      <Th>Course Code</Th>
                      <Th>Course Name</Th>
                      <Th>Instructor</Th>
                      <Th>Time</Th>
                      <Th>Credits</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {registered.map(
                      ({ code, name, instructor, time, credits }, index) => {
                        return (
                          <Tr key={index}>
                            <Td>{code}</Td>
                            <Td>{name}</Td>
                            <Td>{instructor}</Td>
                            <Td>{time}</Td>
                            <Td>{credits}</Td>
                            <Td>
                              <AiOutlineMinus
                                style={{
                                  color: "red",
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleRemove(code)}
                              />
                            </Td>
                          </Tr>
                        );
                      }
                    )}
                  </Tbody>
                </Table>

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
