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
      router.go("/");
    } catch (err) {
      toast.error("Error logging in, try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}

      <div className="container">
        <div className="display-4 text-center mt-2">Login</div>
        <AuthForm
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Login;
