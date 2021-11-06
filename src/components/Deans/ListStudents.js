import { useEffect, useState } from "react";
import axios from "axios";

const ListStudents = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    getInstructors();
  }, []);

  const getInstructors = async () => {
    const { data } = await axios.get(`https://myuniversitymu.herokuapp.com/api/students`);

    setStudent(data);

    console.log(student);
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Major</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.map(
                      ({ first_name, last_name, email, major }, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{`${first_name} ${last_name}`}</td>
                            <td>{email}</td>
                            <td>{major}</td>
                          </tr>
                        );
                      }
                    )}
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

export default ListStudents;
