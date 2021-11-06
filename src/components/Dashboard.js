import React, { useState } from "react";
import { Link } from "react-router-dom";
import BarChart from "./chart/BarChart";
import InstructorDashboard from "./Instructors/InstructorDashboard";

const Dashboard = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));

  const { user, courses, coursesWM, maxMin } = state;
  const { role } = user;

  return (
    <div className="container">
      <>
        {role === "Student" ? (
          <>
            {courses.length > 0 ? (
              <>
                {coursesWM.length > 0 ? (
                  <>
                    <h4>
                      You have registered {courses.length} courses .{" "}
                      {coursesWM.length} courses have their marks published.
                      Below is an overview of your marks.
                    </h4>
                    <h4>
                      You can check detailed marks{" "}
                      <Link to="https://myuniversitymu.herokuapp.com/students-classes">
                        <span style={{ color: "red" }}>Here</span>
                      </Link>{" "}
                    </h4>

                    <BarChart courses={coursesWM} />
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
                <Link to="https://myuniversitymu.herokuapp.com/register-courses">
                  <span style={{ color: "red" }}>Here</span>
                </Link>
              </h4>
            )}
          </>
        ) : (
          <>
            {role === "Instructor" && (
              <>
                <InstructorDashboard maxPC={maxMin} courses={coursesWM} />
              </>
            )}
          </>
        )}
        {role === "Dean" && <h1>Dean</h1>}
      </>
    </div>
  );
};

export default Dashboard;
