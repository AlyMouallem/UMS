import { useState } from "react";
import { Redirect } from "react-router";
const Home = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}
      <div className="home-bg">
        <h1 className="jumbotron">My University</h1>
      </div>

      <div className="container py-2">
        <div className="row py-3">
          <div className="col-6 ">
            <h3>About</h3>
            Enim aliqua ex id adipisicing ullamco fugiat adipisicing
            reprehenderit veniam consectetur. Commodo nulla dolor ex adipisicing
            sit minim et magna. Velit commodo Lorem laborum adipisicing qui
            mollit aute aute voluptate excepteur fugiat esse labore. Commodo
            minim ea duis velit in enim anim elit velit ipsum aliquip aute.
            Consectetur mollit cupidatat duis ut culpa ipsum. Tempor commodo
            occaecat velit sit laborum cupidatat. Cillum velit fugiat fugiat
            veniam commodo sit adipisicing veniam ullamco duis officia non qui.
            Sunt nostrud Lorem Lorem dolore elit nostrud nulla dolor aliqua
            voluptate et non ut. Pariatur irure exercitation culpa labore do
            tempor ut in.
          </div>
          <div className="col-6 ">
            <h3>More info</h3>
            Voluptate ad voluptate proident Lorem dolore sint aliquip Lorem ea
            voluptate deserunt veniam. Nulla proident eiusmod ullamco cupidatat
            non aliqua duis officia nostrud anim. Incididunt excepteur cillum
            excepteur velit duis aute in incididunt duis aute Lorem ad. Velit
            laborum excepteur voluptate laborum cupidatat. Officia labore fugiat
            ad magna incididunt et sit exercitation et qui dolore. Veniam et
            eiusmod non culpa esse. In nostrud eiusmod nulla laborum enim
            nostrud laborum ipsum deserunt. Et reprehenderit sunt enim
            incididunt dolore id officia duis eu proident ea culpa. Fugiat ex
            officia ex reprehenderit elit enim anim sunt proident dolor. Ea est
            ex sunt aliquip.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
