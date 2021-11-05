import { useEffect, useState } from "react";
import axios from "axios";

import { MinusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const ListMajors = () => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    getMajors();
  }, []);

  const getMajors = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/majors`);
    setMajors(
      data.map(({ name }) => ({
        name,
      }))
    );
  };

  const handleDelete = async (name) => {
    const { data } = await axios.delete(`http://localhost:8000/api/majors`, {
      data: { name },
    });
    toast.success(data.message);

    setMajors(majors.filter((major) => major.name !== name));
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
                <table className="table ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {majors.map(({ name }, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{name}</td>
                          <td>
                            <MinusOutlined
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(name)}
                            >
                              Delete
                            </MinusOutlined>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListMajors;
