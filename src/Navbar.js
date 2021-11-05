import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { IoIosPeople } from "react-icons/io";
import { BsBook } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import {
  UserAddOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const { Item, SubMenu } = Menu;
  const [state, setState] = useState([]);

  useEffect(() => {
    getState();
  }, []);
  const getState = () => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  };
  const logout = () => {
    window.localStorage.removeItem("auth");
    setState([]);
    window.location = "/";
  };
  return (
    <>
      {state && state.user && state.user.name && state !== null ? (
        <>
          <Menu mode="horizontal">
            <Item key={110} icon={<AiOutlineHome size="1.3rem" />}>
              <Link to="/dashboard">Dashboard</Link>
            </Item>

            {state &&
              state.user &&
              state.user.role &&
              state.user.role === "Student" && (
                <>
                  <Item key={10} icon={<AiOutlineHome />}>
                    <Link to="/students-classes">My Classes</Link>
                  </Item>
                  <Item key={20} icon={<PlusOutlined />}>
                    <Link to="/register-courses">Register Courses</Link>
                  </Item>
                </>
              )}
            {state &&
              state.user &&
              state.user.role &&
              state.user.role === "Dean" && (
                <>
                  <SubMenu
                    key={200}
                    title="Faculty"
                    icon={<IoIosPeople size="1.7rem" />}
                  >
                    <Item key={101}>
                      <Link to="/list-students">Students</Link>
                    </Item>
                    <Item key={201}>
                      <Link to="/list-instructors">Instructors</Link>
                    </Item>
                  </SubMenu>

                  <SubMenu
                    key={300}
                    title="Academics"
                    icon={<BsBook size="1.3rem" />}
                  >
                    <Item key={320}>
                      <Link to="/list-courses"> List Courses</Link>
                    </Item>
                    <Item key={310}>
                      <Link to="/add-course"> Add Course</Link>
                    </Item>
                    <Item key={420}>
                      <Link to="/list-majors"> List Majors</Link>
                    </Item>
                    <Item key={410}>
                      <Link to="/add-major"> Add Major</Link>
                    </Item>
                  </SubMenu>
                </>
              )}
            {state &&
              state.user &&
              state.user.role &&
              state.user.role === "Instructor" && (
                <>
                  <Item key={244} icon={<SiGoogleclassroom size="1.6rem" />}>
                    <Link to="/instructor-classes">My Classes</Link>
                  </Item>
                </>
              )}

            <SubMenu
              key={100}
              style={{ marginLeft: "auto" }}
              title={state && state.user && state.user.name}
            >
              <Item key={5} icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
              </Item>
              <Item key={6} icon={<LogoutOutlined />}>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </Item>
            </SubMenu>
          </Menu>
        </>
      ) : (
        <Menu mode="horizontal">
          <Item key={1} icon={<AiOutlineHome />}>
            <Link to="/">Home</Link>
          </Item>
          <Item key={2} icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Item>
          <Item key={3} icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        </Menu>
      )}
    </>
  );
};

export default Navbar;
