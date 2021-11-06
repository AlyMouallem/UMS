import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import AuthForm from "./forms/AuthForm";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const Register = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [first_name, setFirstName] = useState("Ali");
  const [last_name, setLastName] = useState("Mouallem");
  const [email, setEmail] = useState("ali2@gmail.com");
  const [password, setPassword] = useState("batata");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState("");
  const [instructor, setInstructor] = useState(false);

  useEffect(() => {
    getMajors();
  }, []);

  const getMajors = async () => {
    try {
      const { data } = await axios.get(
        "https://myuniversitymu.herokuapp.com/api/majors"
      );

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
        const { data } = await axios.post(
          "https://myuniversitymu.herokuapp.com/api/users",
          {
            first_name,
            last_name,
            email,
            password,
            major,
          }
        );

        toast.success(data.message);
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setOk(data.ok);
      } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
      }
    } else {
      try {
        const { data } = await axios.post(
          "https://myuniversitymu.herokuapp.com/api/users",
          {
            first_name,
            last_name,
            email,
            password,
            role: "Instructor",
          }
        );

        setTimeout(500);
        toast.success(data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setOk(data.ok);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}
      <h1 className="jumbotron text-center bg-primary square">Register</h1>
      <div className="container-fluid">
        <div className="container">
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
        <div className="row">
          <div className="col">
            <Modal
              title="Success"
              visible={ok}
              onCancel={() => setOk(false)}
              footer={null}
            >
              <p>Registration Successful</p>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </Modal>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center">
              Already registerd?
              <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
