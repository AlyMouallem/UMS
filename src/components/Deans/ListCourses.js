import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrow90DegLeft } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useHistory } from "react-router";
const ListStudents = () => {
  const [courses, setCourses] = useState([]);
  const router = useHistory();
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
    router.push(`instructor-students/${code}`);
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
                <Table className="table ">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Name</Th>
                      <Th>Code</Th>
                      <Th>Major</Th>
                      <Th>Instructor</Th>
                      <Th>Time</Th>
                      <Th>View students</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {courses.map(
                      ({ name, code, major, instructor, time }, index) => {
                        return (
                          <Tr key={index}>
                            <Th>{index + 1}</Th>
                            <Td>{name}</Td>
                            <Td>{code}</Td>
                            <Td>{major}</Td>
                            <Td>{instructor}</Td>
                            <Td>{time}</Td>
                            <Td>
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
                            </Td>
                            <Td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(code)}
                              >
                                Delete
                              </button>
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
      )}
    </>
  );
};

export default ListStudents;
