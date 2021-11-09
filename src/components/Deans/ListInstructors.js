import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Faculty from "../forms/Faculty";

const ListInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [ok, setOk] = useState(false);
  const [instructorName, setInstructorName] = useState("");

  useEffect(() => {
    const getInstructors = async () => {
      const { data } = await axios.get(`/api/instructors/`);
      setInstructors(data);
    };
    getInstructors();
  }, []);

  const showCourses = async (name) => {
    setOk(true);
    setInstructorName(name);
    const { data } = await axios.get(`/api/courses/instructor/${name}`);
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
                <Faculty people={instructors} showCourses={showCourses} />
              </div>
              <Modal
                title={`Here is a list of ${instructorName}'s courses`}
                visible={ok}
                onCancel={() => setOk(false)}
                onOk={() => setOk(false)}
              >
                <Table className="table">
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
