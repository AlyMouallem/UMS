import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
const GradesTable = ({ grade, setGrade, total, edit }) => {
  const { attendance, midterm, project, final } = grade;
  const handleChange = (key, e) => {
    switch (key) {
      case "attendance":
        setGrade({
          ...grade,
          attendance: { ...attendance, mark: e.target.value },
        });
        break;
      case "midterm":
        setGrade({
          ...grade,
          midterm: { ...midterm, mark: e.target.value },
        });
        break;
      case "project":
        setGrade({
          ...grade,
          project: { ...project, mark: e.target.value },
        });
        break;
      case "final":
        setGrade({
          ...grade,
          final: { ...final, mark: e.target.value },
        });
        break;
      default:
        setGrade(grade);
    }
  };

  return (
    <div key={Math.random() * 199}>
      <Table className="table">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>%</Th>
            <Th>Grade/100</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(grade).map((key, index) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <>
                <Tr key={Math.random() * 899}>
                  <Td>{index + 1}</Td>
                  <Td>{title}</Td>
                  <Td>
                    {key === "total"
                      ? 100
                      : Object.values(grade)[index].percentage}
                  </Td>

                  {!edit ? (
                    <Td>{Object.values(grade)[index].mark}</Td>
                  ) : (
                    <Td>
                      {key !== "total" && (
                        <input
                          onChange={(e) => handleChange(key, e)}
                          value={Object.values(grade)[index].mark}
                          type="number"
                          min={0}
                          max={100}
                          className="form-ctrl"
                        ></input>
                      )}
                    </Td>
                  )}

                  <Td>
                    {(Object.values(grade)[index].mark *
                      Object.values(grade)[index].percentage) /
                      100 || total}
                  </Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default GradesTable;
