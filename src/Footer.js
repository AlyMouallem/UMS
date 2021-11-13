import React, { useState } from "react";

const Footer = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  // const { user } = state;
  // const { role, name, email } = user;
  return (
    <>
      {state &&
      state.user &&
      state.user.role &&
      state.user.name &&
      state.user.email ? (
        <div className="footer">
          <h4>
            <b>User information: </b>
          </h4>
          <h6>{`Name: ${state.user.name} `}</h6>
          <h6>{`Email: ${state.user.email} `}</h6>
          <h6>{`Role: ${state.user.role} `}</h6>
          {state.user.major && <h6>Major: {state.user.major} </h6>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
