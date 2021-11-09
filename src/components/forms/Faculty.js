import React from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
const Faculty = ({ people, showStudents, showCourses }) => {
  return (
    <div>
      <Table className="table">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            {showStudents && <Th>Major</Th>}
            <Th>View Classes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {people.map(({ first_name, last_name, email, major }, index) => {
            return (
              <Tr key={index}>
                <Th>{index + 1}</Th>
                <Td>{`${first_name} ${last_name}`}</Td>
                <Td>{email}</Td>
                {showStudents && <Td>{major}</Td>}
                <Td>
                  {
                    <BsArrow90DegLeft
                      onClick={
                        showStudents
                          ? () => showStudents(`${first_name} ${last_name}`)
                          : showCourses
                          ? () => showCourses(`${first_name} ${last_name}`)
                          : ""
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
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default Faculty;
