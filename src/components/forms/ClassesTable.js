import { AppstoreFilled } from "@ant-design/icons";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
const TableC = ({
  courses,
  showGrades,
  showStudents,
  dean,
  showGradesInst,
  handleDelete,
}) => {
  return (
    <div>
      <Table className="table">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Course Code</Th>
            <Th>Course Name</Th>
            {showGradesInst && <Th>Student</Th>}
            <Th>{showGrades || dean ? "Instructor" : "Major"}</Th>
            <Th>Time</Th>
            <Th>Credits</Th>
            <Th>{showGrades || showGradesInst ? "Grades" : "View Students"}</Th>
            {dean && <Th>Delete</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {courses.map(
            (
              { code, name, major, instructor, time, credits, grades, student },
              index
            ) => {
              return (
                <Tr key={index + index * +1 * 5}>
                  <Th>{index + 1}</Th>
                  <Td>{code}</Td>
                  <Td>{name}</Td>
                  {showGradesInst && <Td>{student}</Td>}
                  <Td>{showGrades || dean ? instructor : major}</Td>
                  <Td>{time}</Td>
                  <Td>{credits}</Td>
                  <Td>
                    {
                      <AppstoreFilled
                        onClick={
                          showStudents
                            ? () => showStudents(code)
                            : showGrades
                            ? () => showGrades(code)
                            : showGradesInst
                            ? () =>
                                showGradesInst(
                                  grades,
                                  student,
                                  code,
                                  instructor
                                )
                            : ""
                        }
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                      />
                    }
                  </Td>
                  {dean && (
                    <Td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(code)}
                      >
                        Delete
                      </button>
                    </Td>
                  )}
                </Tr>
              );
            }
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default TableC;
