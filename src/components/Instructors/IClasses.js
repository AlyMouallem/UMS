import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import TableC from "../forms/ClassesTable";
const IClasses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [courses, setCourses] = useState([]);

  const router = useHistory();
  useEffect(() => {
    const getInstCourses = async () => {
      const { data } = await axios.get(
        `/api/courses/instructor/${state.user.name}`
      );
      setCourses(data);
    };
    getInstCourses();
  }, [state.user.name]);

  const showStudents = async (code) => {
    router.push(`/instructor-students/${code}`);
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
                  <div className="py-3">
                    <TableC courses={courses} showStudents={showStudents} />
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
