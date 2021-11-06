import { useEffect, useState } from "react";
import axios from "axios";
import { AppstoreFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const ListInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [ok, setOk] = useState(false);
  const [instructorName, setInstructorName] = useState("");

  useEffect(() => {
    getInstructors();
  }, []);

  const getInstructors = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/instructors/`);
    setInstructors(data);
  };
  const showCourses = async (name) => {
    setOk(true);
    setInstructorName(name);
    const { data } = await axios.get(
      `http://localhost:8000/api/courses/instructor/${name}`
    );
    setCourses(data);
  };
  return (
    <>
      {instructors && instructors.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-3"></div>
              <div>
                <h1>Below are all the instructors</h1>
                <Table className="table">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Courses</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {instructors.map(
                      ({ first_name, last_name, email }, index) => {
                        return (
                          <Tr key={index}>
                            <Th>{index + 1}</Th>
                            <Td>{`${first_name} ${last_name}`}</Td>
                            <Td>{email}</Td>

                            <Td>
                              {
                                <AppstoreFilled
                                  onClick={() =>
                                    showCourses(`${first_name} ${last_name}`)
                                  }
                                  style={{
                                    fontSize: "24px",
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
              <Modal
                title={`Here is a list of ${instructorName}'s courses`}
                visible={ok}
                onCancel={() => setOk(false)}
                onOk={() => setOk(false)}
              >
                <Table className="Table">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Td>Major</Td>
                      <Th>Code</Th>
                      <Th>Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {courses &&
                      courses.length > 0 &&
                      courses.map(({ code, name, major }, index) => {
                        return (
                          <Tr>
                            <Th>{index + 1}</Th>
                            <Td>{major}</Td>
                            <Td>{code}</Td>
                            <Td>{name}</Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListInstructors;
