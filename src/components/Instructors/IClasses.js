import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import TableC from "../forms/ClassesTable";
import Filter from "../forms/Filter";
const IClasses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [courses, setCourses] = useState([]);
  const [codes, setCodes] = useState([]);
  const [filter, setFilter] = useState([courses]);
  const router = useHistory();
  useEffect(() => {
    const getInstCourses = async () => {
      const { data } = await axios.get(
        `/api/courses/instructor/${state.user.name}`
      );
      setCourses(data);
      setFilter(data);
      setCodes(data.map(({ code }) => code));
    };
    getInstCourses();
  }, []);

  const showStudents = async (code) => {
    router.push(`/instructor-students/${code}`);
  };
  const handleClick = (item) => {
    if (item !== "All") {
      setFilter(courses.filter(({ code }) => code === item));
    } else {
      setFilter(courses);
    }
  };

  return (
    <>
      {state && state.user && state.user.name && (
        <>
          {courses.length > 0 ? (
            <>
              <h1> Here is a list of your Classes</h1>

              <div className="container">
                <div className="row ">
                  <div className="col col-sm-2 py-4">
                    <Filter items={codes} handleClick={handleClick} />
                  </div>

                  <div className="col col-sm-8 py-3">
                    <TableC courses={filter} showStudents={showStudents} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1>You don't have any student</h1>
          )}
        </>
      )}
    </>
  );
};

export default IClasses;
