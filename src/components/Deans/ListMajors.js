import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { toast } from "react-toastify";
const ListMajors = () => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    getMajors();
  }, []);

  const getMajors = async () => {
    const { data } = await axios.get(`/api/majors`);
    setMajors(
      data.map(({ name }) => ({
        name,
      }))
    );
  };

  const handleDelete = async (name) => {
    try {
      const { data } = await axios.delete(`/api/majors/${name}`);
      toast.success(data.message);

      setMajors(majors.filter((major) => major.name !== name));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {majors && majors.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <h1>Below are all the majors</h1>
                <Table className="table">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Name</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {majors.map(({ name }, index) => {
                      return (
                        <Tr key={index}>
                          <Th>{index + 1}</Th>
                          <Td>{name}</Td>
                          <Td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(name)}
                            >
                              Delete
                            </button>
                          </Td>
                        </Tr>
                      );
                    })}
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

export default ListMajors;
