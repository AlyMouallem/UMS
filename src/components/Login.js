import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./forms/AuthForm";
import { Redirect } from "react-router";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const router = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/signin", {
        email,
        password,
      });

      window.localStorage.setItem("auth", JSON.stringify(data));
      router.go(0);
    } catch (err) {
      toast.error("Error logging in, try again later.");
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
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
