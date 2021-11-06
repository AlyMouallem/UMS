import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./forms/AuthForm";
import { Redirect } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("ali@gmail.com");
  const [password, setPassword] = useState("batata");
  const [loading, setLoading] = useState(false);
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://myuniversitymu.herokuapp.com/auth/signin",
        {
          email,
          password,
        }
      );
      window.localStorage.setItem("auth", JSON.stringify(data));

      window.location = "/dashboard";
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}

      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container-fluid">
        <div className="container">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
          />
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center">
              Don't have an account?
              <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
