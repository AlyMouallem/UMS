import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentDashboard from "./chart/StudentDashboard";
import IDDashboard from "./chart/IDDashboard";

const Dashboard = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));

  const { user, courses, coursesWM, maxMin } = state;
  const { role, name } = user;

  return (
    <div className="container">
      {role === "Student" ? (
        <>
          {courses && courses.length > 0 ? (
            <>
              {coursesWM && coursesWM.length > 0 ? (
                <>
                  <h4>
                    You have registered {courses.length} courses,{" "}
                    {coursesWM.length} courses have their marks published. Below
                    is an overview of your marks.
                  </h4>
                  <h4>
                    You can check detailed marks{" "}
                    <Link to={`/students-classes/${name}`}>Here</Link>{" "}
                  </h4>

                  <StudentDashboard courses={coursesWM} />
                </>
              ) : (
                <h1>
                  You have registered {courses.length} courses. No marks
                  submitted yet.
                </h1>
              )}
            </>
          ) : (
            <h4>
              You have not registered any course yet. Please register{" "}
              <Link to="/register-courses">Here</Link>
            </h4>
          )}
        </>
      ) : (
        <>
          {role === "Instructor" && (
            <>
              {maxMin && maxMin.length > 0 ? (
                <>
                  <IDDashboard maxPC={maxMin} />
                </>
              ) : (
                <h1>You have no student marks published.</h1>
              )}
            </>
          )}
        </>
      )}
      {role === "Dean" && (
        <>
          <IDDashboard dean={true} maxPC={maxMin} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
