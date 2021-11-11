import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TableC from "../forms/ClassesTable";
import { useHistory } from "react-router";
import { Modal } from "antd";
import Filter from "../forms/Filter";

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [ok, setOk] = useState(false);
  const [remove, setRemove] = useState("");
  const [filter, setFilter] = useState(courses);
  const [majors, setMajors] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const router = useHistory();
  const [heading, setHeading] = useState("Below are all the classes");
  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(`/api/courses`);
      setCourses(data);
      setFilter(data);
      setMajors([...new Set(data.map(({ major }) => major))]);
      setInstructors([...new Set(data.map(({ instructor }) => instructor))]);
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

  const handleClick = (item) => {
    if (item !== "All") {
      if (majors.indexOf(item) !== -1) {
        setFilter(courses.filter(({ major }) => major === item));
        setHeading(`Below are all the ${item} classes`);
      } else if (instructors.indexOf(item) !== -1) {
        setFilter(courses.filter(({ instructor }) => instructor === item));
        setHeading(`Below are the classes taught by ${item}`);
      }
    } else {
      setHeading(`Below are all the classes`);
      setFilter(courses);
    }
  };
  return (
    <>
      {courses && courses.length > 0 && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-2 col-sm-2" style={{ paddingTop: "5%" }}>
                <h4>Filter by Major</h4>
                <Filter items={majors} handleClick={handleClick} />
                <h4>Filter by Instructor</h4>
                <Filter items={instructors} handleClick={handleClick} />
              </div>
              <div className="col-md-8 col-sm-8">
                <h1>{heading}</h1>
                <TableC
                  courses={filter}
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

export default ListCourses;
