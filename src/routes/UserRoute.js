import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";

import { useHistory } from "react-router";
const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [state] = useState(JSON.stringify(window.localStorage.getItem("auth")));
  const router = useHistory();
  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");

      if (data.ok) setOk(true);
    } catch (error) {
      router.push("/login");
    }
  };
  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <>{children}</>
  );
};
export default UserRoute;
