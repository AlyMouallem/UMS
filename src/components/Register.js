import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./forms/AuthForm";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router";
import { SyncOutlined } from "@ant-design/icons";

const Register = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState("");
  const [instructor, setInstructor] = useState(false);

  const router = useHistory();
  useEffect(() => {
    getMajors();
  }, []);

  const getMajors = async () => {
    try {
      const { data } = await axios.get("/api/majors");

      setMajors(
        ...majors,
        data.map((data) => data.name)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!instructor) {
      try {
        const response = await axios.post("/api/users", {
          first_name,
          last_name,
          email,
          password,
          major,
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        router.go("/");
        toast.success(response.data.message);
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post("/api/users", {
          first_name,
          last_name,
          email,
          password,
          role: "Instructor",
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        router.go("/");
        toast.success(response.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data);
        toast.error(err.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}
      {majors.length > 0 ? (
        <>
          <div className="container">
            <div className="display-4 text-center mt-2">Register</div>
            <AuthForm
              handleSubmit={handleSubmit}
              first_name={first_name}
              setFirstName={setFirstName}
              last_name={last_name}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              register="Register"
              majors={majors}
              major={major}
              setMajor={setMajor}
              instructor={instructor}
              setInstructor={setInstructor}
            />
          </div>
        </>
      ) : (
        <SyncOutlined className="spinner" />
      )}
    </>
  );
};

export default Register;
