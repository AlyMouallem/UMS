import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TableC from "../forms/ClassesTable";
import { useHistory } from "react-router";
import { Modal } from "antd";
const ListStudents = () => {
  const [courses, setCourses] = useState([]);
  const router = useHistory();
  const [ok, setOk] = useState(false);
  const [remove, setRemove] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(`/api/courses`);
      setCourses(data);
    };
    getCourses();
  }, []);

  const deleteCourse = async (code) => {
    try {
      const { data } = await axios.delete(`/api/courses/code/${code}`);
      setOk(false);
      toast.success(`${code} ${data.message}`);
      setCourses(courses.filter((course) => course.code !== code));
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleDelete = (code) => {
    setOk(true);
    setRemove(code);
  };
  const showStudents = (code) => {
    router.push(`instructor-students/${code}`);
  };

  return (
    <>
      {courses && courses.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="py-3">
                <h1>Below are all the Courses</h1>
                <TableC
                  courses={courses}
                  showStudents={showStudents}
                  handleDelete={handleDelete}
                  dean={true}
                />
              </div>
              <Modal
                title="Confirm delete or cancel?"
                visible={ok}
                onCancel={() => setOk(false)}
                okText="Delete"
                cancelText="Cancel"
                okType="primary"
                onOk={() => deleteCourse(remove)}
              >
                <strong> {`Do you want to delete ${remove} course?`}</strong>{" "}
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListStudents;
