import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { toast } from "react-toastify";
import { Modal } from "antd";
const ListMajors = () => {
  const [majors, setMajors] = useState([]);
  const [ok, setOk] = useState(false);
  const [remove, setRemove] = useState("");

  useEffect(() => {
    const getMajors = async () => {
      const { data } = await axios.get(`/api/majors`);
      setMajors(
        data.map(({ name }) => ({
          name,
        }))
      );
    };
    getMajors();
  }, []);
  const deleteMajor = async (name) => {
    try {
      const { data } = await axios.delete(`/api/majors/${name}`);
      toast.success(data.message);
      setOk(false);
      setMajors(majors.filter((major) => major.name !== name));
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleDelete = (name) => {
    setOk(true);
    setRemove(name);
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
            <Modal
              title="Confirm delete or cancel?"
              visible={ok}
              onCancel={() => setOk(false)}
              okText="Delete"
              cancelText="Cancel"
              okType="primary"
              onOk={() => deleteMajor(remove)}
            >
              <strong> {`Do you want to delete ${remove} major?`}</strong>{" "}
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default ListMajors;
