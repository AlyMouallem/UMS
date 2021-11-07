import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrow90DegLeft } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useHistory } from "react-router";

const IClasses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [courses, setCourses] = useState([]);

  const router = useHistory();
  useEffect(() => {
    const getInstCourses = async () => {
      const { data } = await axios.get(
        `/api/courses/instructor/${state.user.name}`
      );
      setCourses(data);
    };
    getInstCourses();
  }, []);

  const showStudents = async (code) => {
    router.push(`/instructor-students/${code}`);
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
                    <Table className="table">
                      <Thead>
                        <Tr>
                          <Th>#</Th>
                          <Th>Course Code</Th>
                          <Th>Course Name</Th>
                          <Th>Time</Th>
                          <Th>Credits</Th>
                          <Th>Major</Th>
                          <Th>View Students</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {courses.map(
                          ({ code, name, time, credits, major }, index) => {
                            return (
                              <Tr key={index}>
                                <Th>{index + 1}</Th>
                                <Td>{code}</Td>
                                <Td>{name}</Td>
                                <Td>{time}</Td>
                                <Td>{credits}</Td>
                                <Td>{major}</Td>

                                <Td>
                                  {
                                    <BsArrow90DegLeft
                                      onClick={() => showStudents(code)}
                                      style={{
                                        fontSize: "20px",
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
