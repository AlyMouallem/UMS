import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { Menu } from "antd";
import { IoIosPeople } from "react-icons/io";
import { BsBook } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { UserOutlined, LogoutOutlined, PlusOutlined } from "@ant-design/icons";

import Nav from "./components/Nav";
const Navbar = () => {
  const { Item, SubMenu } = Menu;
  const [state, setState] = useState([]);

  const router = useHistory();

  useEffect(() => {
    const getState = () => {
      setState(JSON.parse(window.localStorage.getItem("auth")));
    };
    getState();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState([]);
    router.push("/");
  };
  return (
    <>
      {state && state.user && state.user.name && state !== null ? (
        <>
          <Menu className="menu-nav" mode="horizontal">
            <Item key={110} icon={<UserOutlined />}>
              <NavLink to="/dashboard">
                {state && state.user && state.user.name}
              </NavLink>
            </Item>

            {state &&
              state.user &&
              state.user.role &&
              state.user.role === "Student" && (
                <>
                  <Item key={10} icon={<SiGoogleclassroom size="1.6rem" />}>
                    <NavLink to={`/students-classes/${state.user.name}`}>
                      My Classes
                    </NavLink>
                  </Item>
                  <Item key={20} icon={<PlusOutlined />}>
                    <NavLink to="/register-courses">Register Courses</NavLink>
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
                      <NavLink to="/list-students">Students</NavLink>
                    </Item>
                    <Item key={201}>
                      <NavLink to="/list-instructors">Instructors</NavLink>
                    </Item>
                  </SubMenu>

                  <SubMenu
                    key={300}
                    title="Academics"
                    icon={<BsBook size="1.3rem" />}
                  >
                    <Item key={320}>
                      <NavLink to="/list-courses"> List Courses</NavLink>
                    </Item>
                    <Item key={310}>
                      <NavLink to="/add-course"> Add Course</NavLink>
                    </Item>
                    <Item key={420}>
                      <NavLink to="/list-majors"> List Majors</NavLink>
                    </Item>
                    <Item key={410}>
                      <NavLink to="/add-major"> Add Major</NavLink>
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
                    <NavLink to="/instructor-classes">My Classes</NavLink>
                  </Item>
                </>
              )}

            <Item
              style={{ marginLeft: "auto" }}
              key={6}
              icon={<LogoutOutlined />}
            >
              <NavLink to="/" onClick={logout}>
                Logout
              </NavLink>
            </Item>
          </Menu>
        </>
      ) : (
        <Nav />
      )}
    </>
  );
};

export default Navbar;
