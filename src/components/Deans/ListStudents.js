import { useEffect, useState } from "react";
import axios from "axios";
import { BsArrow90DegLeft } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const ListStudents = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const getInstructors = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/students`);
      setStudent(data);
      console.log(student);
    };
    getInstructors();
  }, []);

  const showStudents = async (name) => {
    window.location = `/students-classes/${name}`;
  };

  return (
    <>
      {student && student.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-3"></div>
              <div>
                <h1>Below are all the students</h1>
                <Table className="table responsiveTable">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Major</Th>
                      <Th>View Classes</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {student.map(
                      ({ first_name, last_name, email, major }, index) => {
                        return (
                          <Tr key={index}>
                            <Th>{index + 1}</Th>
                            <Td>{`${first_name} ${last_name}`}</Td>
                            <Td>{email}</Td>
                            <Td>{major}</Td>
                            <Td>
                              {
                                <BsArrow90DegLeft
                                  onClick={() =>
                                    showStudents(`${first_name} ${last_name}`)
                                  }
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
      )}
    </>
  );
};

export default ListStudents;
