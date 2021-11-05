import { useEffect, useState } from "react";
import axios from "axios";
import { AppstoreFilled } from "@ant-design/icons";
import { Modal } from "antd";

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
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Courses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instructors.map(
                      ({ first_name, last_name, email }, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{`${first_name} ${last_name}`}</td>
                            <td>{email}</td>

                            <td>
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
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <Modal
                title={`Here is a list of ${instructorName}'s courses`}
                visible={ok}
                onCancel={() => setOk(false)}
                onOk={() => setOk(false)}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <td>Major</td>
                      <th>Code</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses &&
                      courses.length > 0 &&
                      courses.map(({ code, name, major }, index) => {
                        return (
                          <tr>
                            <th>{index + 1}</th>
                            <td>{major}</td>
                            <td>{code}</td>
                            <td>{name}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListInstructors;
