import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { Redirect } from "react-router";
const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const router = useHistory();

  if (state) {
    var { token } = state;
  } else {
    router.push("/");
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-student", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
        router.go("/");
      }
    } catch (error) {
      setOk(false);
      router.go("/");
    }
  };

  return (
    <>
      {!state && <Redirect to="/" />}
      {state && !ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default UserRoute;
