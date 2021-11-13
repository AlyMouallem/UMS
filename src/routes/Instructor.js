import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [state] = useState(JSON.stringify(window.localStorage.getItem("auth")));
  //   const { user } = state;
  //   const { role } = user;
  const router = useHistory();
  useEffect(() => {
    if (
      (state && state.user.role === "Instructor") ||
      state.user.role === "Dean"
    ) {
      setOk(true);
    } else {
      router.push("/login");
    }
  }, []);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <>{children}</>
  );
};
export default InstructorRoute;
