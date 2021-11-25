import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddMajor from "./components/Deans/AddMajor";
import AddCourse from "./components/Deans/AddCourse";
import ListMajors from "./components/Deans/ListMajors";
import ListCourses from "./components/Deans/ListCourses";
import ListInstructors from "./components/Deans/ListInstructors";
import ListStudents from "./components/Deans/ListStudents";
import PageNotFound from "./components/PageNotFound";
import Classes from "./components/Students/Classes";
import RegisterCourses from "./components/Students/RegisterCourses";
import Students from "./components/Instructors/Students";
import IClasses from "./components/Instructors/IClasses";
import Profile from "./components/Profile";
import IDDashboard from "./components/chart/IDDashboard";
import Home2 from "./components/Home2";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home2} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/list-students" component={ListStudents} />
        <Route exact path="/list-instructors" component={ListInstructors} />
        <Route exact path="/list-courses" component={ListCourses} />
        <Route exact path="/list-majors" component={ListMajors} />
        <Route exact path="/add-course" component={AddCourse} />
        <Route exact path="/add-major" component={AddMajor} />
        <Route exact path="/students-classes/:name" component={Classes} />
        <Route exact path="/instructor-students/:code" component={Students} />
        <Route exact path="/instructor-classes" component={IClasses} />
        <Route exact path="/register-courses" component={RegisterCourses} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/iddashboard" component={IDDashboard} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </>
  );
};

export default MainRouter;
