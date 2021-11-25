import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const DeanRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const { token } = state;

  const router = useHistory();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-dean", {
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
  !state && router.push("/");
  return (
    <>
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
export default DeanRoute;
