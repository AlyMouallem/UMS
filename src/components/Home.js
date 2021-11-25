import { useState } from "react";
import { Redirect } from "react-router";

const Home = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));

  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}

      <div className="container">
        <div className="row py-3">
          <div id="about" className="col-sm-12 col-md-6 col-lg-6">
            <h3>About</h3>
            Enim aliqua ex id adipisicing ullamco fugiat adipisicing
            reprehenderit veniam consectetur. Commodo nulla dolor ex adipisicing
            sit minim et magna. Velit commodo Lorem laborum adipisicing qui
            mollit aute aute voluptate excepteur fugiat esse labore. Commodo
            minim ea duis velit in enim anim elit velit ipsum aliquip aute.
            Consectetur mollit cupidatat duis ut culpa ipsum. Tempor commodo
            occaecat velit sit laborum cupidatat.
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <h3>More info</h3>
            Voluptate ad voluptate proident Lorem dolore sint aliquip Lorem ea
            voluptate deserunt veniam. Nulla proident eiusmod ullamco cupidatat
            non aliqua duis officia nostrud anim. Incididunt excepteur cillum
            excepteur velit duis aute in incididunt duis aute Lorem ad. Velit
            laborum excepteur voluptate laborum cupidatat. Officia labore fugiat
            ad magna incididunt et sit exercitation et qui dolore. Veniam et
            eiusmod non culpa esse.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
