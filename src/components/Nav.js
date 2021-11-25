import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Login from "./Login";
import Register from "./Register";

const Nav = () => {
  const [state, setState] = useState([]);
  const [loginOk, setLoginOk] = useState(false);
  const [registerOk, setRegisterOk] = useState(false);

  useEffect(() => {
    const getState = () => {
      setState(JSON.parse(window.localStorage.getItem("auth")));
    };
    getState();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark menu shadow ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <svg
              width="200"
              height="50"
              viewBox="0 0 370 94"
              className="css-1j8o68f"
            >
              <defs id="SvgjsDefs1254"></defs>
              <g
                id="SvgjsG1255"
                featurekey="symbolFeature-0"
                transform="matrix(1.0505246710164184,0,0,1.0505246710164184,-13.891236552918766,-5.252623355082092)"
                fill="#ffffff"
              >
                <g xmlns="http://www.w3.org/2000/svg">
                  <path d="M45.3042679,27.0248699c0.9121513,0.4507217,1.9233437,0.774847,2.9565048,0.9560852   c0.6649094,0.1209202,1.340992,0.1871033,2.0333672,0.1871033c0.6592331,0,1.346302-0.0661831,1.97826-0.1871033   c1.066021-0.1758385,2.0716286-0.4999638,3.0057449-0.9560852c2.8850136-1.3738537,5.110508-3.896204,6.0721817-6.979023   c0.3463707-1.0989723,0.5222092-2.2528648,0.5222092-3.4508801C61.8725357,10.1819992,56.6905365,5,50.2941399,5   c-6.3909988,0-11.5839844,5.1819992-11.5839844,11.5949669c0,1.2034149,0.1811447,2.3737831,0.5328255,3.4840202   C40.2156334,23.1342525,42.4248428,25.64571,45.3042679,27.0248699z"></path>
                  <polygon points="86.3649292,90.5389709 14.9926119,90.5389709 13.2231417,95.0341797 87.9585571,95.0341797  "></polygon>
                  <path d="M81.8697205,75.9272766c0,0-6.3195114,3.6542664-14.8922577-1.6870956   c-5.6324425-3.5059814-12.9302864-4.2149277-16.2986908,0c-3.3686867-4.2149277-10.6718369-3.5059814-16.2989731,0   c-8.5726528,5.341362-14.8922539,1.6870956-14.8922539,1.6870956l-4.4949331,10.3969498h71.3723145L81.8697205,75.9272766z"></path>
                  <path d="M31.0329895,65.376358h0.4121838l0.0934582-0.2143784l6.2922363-14.6283569l-0.0551071,11.4960175   c4.8964119-1.9014664,10.1828537-1.7475014,12.9030113,1.6597214c2.5825729-3.2313843,7.4624176-3.5502014,12.1388664-1.9565735   l0.0933647-11.1771965l6.8637848,14.5844231l0.1096497,0.2363434h0.4398346   c3.7093811,1.4670334,6.7756271,1.3462982,8.8199844,0.9175491l-0.2968521-0.9175491l-6.3634491-19.315979   c0-0.08778-0.6870651-2.1979446-0.7034454-2.2860031c-1.4067154-6.5942039-5.1271744-11.3147774-12.0127373-11.3147774   l-19.035511-0.0163841c-3.9896622,0-7.3195305,2.19804-9.3804531,5.3632393c0,0-1.2143059,1.9400024-1.6650276,4.1655006   c-0.1539631,0.7472916-1.0604343,3.1103706-1.0661125,3.9016037c0,0.0328598-0.0109844,0.0660896-0.0109844,0.099041   l-6.1380844,19.403759l-0.291172,0.9175491C24.2245007,66.7226562,27.3129044,66.8545609,31.0329895,65.376358z"></path>
                </g>
              </g>
              <g
                id="SvgjsG1256"
                featurekey="nameFeature-0"
                transform="matrix(0.36589522288815657,0,0,0.36589522288815657,97.54937194226544,0.46945186265693106)"
                fill="#FFF"
              >
                <path d="M13.613 40.37109 c-5.4688 0 -9.6484 -3.5156 -9.6484 -9.2188 l0 -18.398 l2.7148 0 l0 18.008 c0 4.6875 3.0078 7.0898 6.9336 7.0898 c3.9063 0 6.9922 -2.4219 6.9922 -7.0898 l0 -18.008 l2.6953 0 l0 18.398 c0 5.7031 -4.1992 9.2188 -9.6875 9.2188 z M53.140718750000005 12.754000000000001 l2.6758 0 l0 27.246 l-2.6563 0 l-15.605 -22.91 l0 22.91 l-2.6367 0 l0 -27.246 l2.6367 0 l15.586 22.813 l0 -22.813 z M68.00005 40 l0 -27.246 l2.7148 0 l0 27.246 l-2.7148 0 z M99.46065625 12.754000000000001 l2.8516 0 l-9.9805 27.246 l-2.6367 0 l-9.9805 -27.246 l2.8125 0 l8.4766 23.711 z M125.53125 15.254000000000001 l-11.406 0 l0 9.9023 l10.02 0 l0 2.4805 l-10.02 0 l0 9.8633 l11.406 0 l0 2.5 l-14.219 0 l0 -27.246 l14.219 0 l0 2.5 z M150.41009375 40 l-6.9727 -12.402 l-5.1953 0 l0 12.402 l-2.7148 0 l0 -27.246 l8.75 0 c5.3906 0 8.0078 3.3789 8.0078 7.5391 c0 3.75 -2.207 6.6016 -6.1523 7.1875 l7.4023 12.52 l-3.125 0 z M138.24219375 15.195 l0 10.117 l5.7227 0 c3.8867 0 5.7031 -2.0508 5.7031 -5.0195 c0 -2.9297 -1.8164 -5.0977 -5.7031 -5.0977 l-5.7227 0 z M171.34384375 40.37109 c-5.6055 0 -9.5117 -2.6758 -10.488 -6.9922 l2.7148 -0.66406 c0.74219 3.2617 3.8281 5.2148 7.8516 5.2148 c3.2813 0 6.6797 -1.2891 6.6016 -5.1563 c-0.058594 -3.6719 -3.8867 -4.6094 -7.832 -5.625 c-4.3555 -1.1133 -8.5742 -2.3438 -8.5742 -7.3633 c0 -5.0391 4.2188 -7.4023 8.8477 -7.4023 c4.8047 0 8.8086 2.0703 9.8047 6.4258 l-2.6367 0.68359 c-0.78125 -3.2031 -3.75 -4.668 -7.1094 -4.668 c-2.9883 0 -6.1719 1.3477 -6.1719 4.9805 c0 3.2813 3.2422 4.1992 6.9141 5.1172 c4.4922 1.1133 9.5117 2.3047 9.5117 7.8125 c0 5.3711 -4.4531 7.6367 -9.4336 7.6367 z M190.87114375 40 l0 -27.246 l2.7148 0 l0 27.246 l-2.7148 0 z M219.46075 12.754000000000001 l0 2.5 l-7.168 0 l0 24.746 l-2.6953 0 l0 -24.746 l-7.168 0 l0 -2.5 l17.031 0 z M245.5114375 12.754000000000001 l-8.9648 14.258 l0 12.988 l-2.7539 0 l0 -12.988 l-8.9648 -14.258 l3.1641 0 l7.1875 11.797 l7.168 -11.797 l3.1641 0 z M295.69915625 40 l-2.5977 0 l-1.8164 -23.145 l-9.3359 23.145 l-1.5234 0 l-9.2773 -22.988 l-1.8359 22.988 l-2.6172 0 l2.0117 -27.246 l3.3594 0 l9.1211 22.539 l9.1211 -22.539 l3.3984 0 z M324.1329375 40 l-2.4609 -6.8359 l-12.637 0 l-2.4609 6.8359 l-2.8711 0 l10.039 -27.246 l3.2031 0 l10.039 27.246 l-2.8516 0 z M309.9336375 30.6836 l10.84 0 l-5.4297 -15.078 z M354.207125 12.754000000000001 l2.6758 0 l0 27.246 l-2.6563 0 l-15.605 -22.91 l0 22.91 l-2.6367 0 l0 -27.246 l2.6367 0 l15.586 22.813 l0 -22.813 z M386.33215625 40 l-2.4609 -6.8359 l-12.637 0 l-2.4609 6.8359 l-2.8711 0 l10.039 -27.246 l3.2031 0 l10.039 27.246 l-2.8516 0 z M372.13285625 30.6836 l10.84 0 l-5.4297 -15.078 z M409.68734375 40.37109 c-7.5195 0 -13.418 -5.0977 -13.418 -13.926 c0 -8.8672 5.8984 -14.063 13.438 -14.063 c4.8438 0 9.1016 2.1289 11.445 6.3281 l-2.4023 1.2891 c-1.8945 -3.4375 -5.2734 -5.0195 -9.043 -5.0195 c-5.9961 0 -10.703 4.0625 -10.703 11.426 s4.6875 11.406 10.781 11.406 c5.332 0 9.2383 -3.1445 9.7852 -9.0234 l-9.8047 0 l0 -2.3828 l12.5 0 l0 13.594 l-2.2852 0 l0 -5.5859 c-1.8359 3.8086 -5.4688 5.957 -10.293 5.957 z M447.26171875 15.254000000000001 l-11.406 0 l0 9.9023 l10.02 0 l0 2.4805 l-10.02 0 l0 9.8633 l11.406 0 l0 2.5 l-14.219 0 l0 -27.246 l14.219 0 l0 2.5 z M485.2655625 40 l-2.5977 0 l-1.8164 -23.145 l-9.3359 23.145 l-1.5234 0 l-9.2773 -22.988 l-1.8359 22.988 l-2.6172 0 l2.0117 -27.246 l3.3594 0 l9.1211 22.539 l9.1211 -22.539 l3.3984 0 z M510.65234375 15.254000000000001 l-11.406 0 l0 9.9023 l10.02 0 l0 2.4805 l-10.02 0 l0 9.8633 l11.406 0 l0 2.5 l-14.219 0 l0 -27.246 l14.219 0 l0 2.5 z M538.8711875 12.754000000000001 l2.6758 0 l0 27.246 l-2.6563 0 l-15.605 -22.91 l0 22.91 l-2.6367 0 l0 -27.246 l2.6367 0 l15.586 22.813 l0 -22.813 z M567.44121875 12.754000000000001 l0 2.5 l-7.168 0 l0 24.746 l-2.6953 0 l0 -24.746 l-7.168 0 l0 -2.5 l17.031 0 z M598.00009375 40.37109 c-5.6055 0 -9.5117 -2.6758 -10.488 -6.9922 l2.7148 -0.66406 c0.74219 3.2617 3.8281 5.2148 7.8516 5.2148 c3.2813 0 6.6797 -1.2891 6.6016 -5.1563 c-0.058594 -3.6719 -3.8867 -4.6094 -7.832 -5.625 c-4.3555 -1.1133 -8.5742 -2.3438 -8.5742 -7.3633 c0 -5.0391 4.2188 -7.4023 8.8477 -7.4023 c4.8047 0 8.8086 2.0703 9.8047 6.4258 l-2.6367 0.68359 c-0.78125 -3.2031 -3.75 -4.668 -7.1094 -4.668 c-2.9883 0 -6.1719 1.3477 -6.1719 4.9805 c0 3.2813 3.2422 4.1992 6.9141 5.1172 c4.4922 1.1133 9.5117 2.3047 9.5117 7.8125 c0 5.3711 -4.4531 7.6367 -9.4336 7.6367 z M634.73409375 12.754000000000001 l-8.9648 14.258 l0 12.988 l-2.7539 0 l0 -12.988 l-8.9648 -14.258 l3.1641 0 l7.1875 11.797 l7.168 -11.797 l3.1641 0 z M651.644625 40.37109 c-5.6055 0 -9.5117 -2.6758 -10.488 -6.9922 l2.7148 -0.66406 c0.74219 3.2617 3.8281 5.2148 7.8516 5.2148 c3.2813 0 6.6797 -1.2891 6.6016 -5.1563 c-0.058594 -3.6719 -3.8867 -4.6094 -7.832 -5.625 c-4.3555 -1.1133 -8.5742 -2.3438 -8.5742 -7.3633 c0 -5.0391 4.2188 -7.4023 8.8477 -7.4023 c4.8047 0 8.8086 2.0703 9.8047 6.4258 l-2.6367 0.68359 c-0.78125 -3.2031 -3.75 -4.668 -7.1094 -4.668 c-2.9883 0 -6.1719 1.3477 -6.1719 4.9805 c0 3.2813 3.2422 4.1992 6.9141 5.1172 c4.4922 1.1133 9.5117 2.3047 9.5117 7.8125 c0 5.3711 -4.4531 7.6367 -9.4336 7.6367 z M684.882625 12.754000000000001 l0 2.5 l-7.168 0 l0 24.746 l-2.6953 0 l0 -24.746 l-7.168 0 l0 -2.5 l17.031 0 z M707.9453125 15.254000000000001 l-11.406 0 l0 9.9023 l10.02 0 l0 2.4805 l-10.02 0 l0 9.8633 l11.406 0 l0 2.5 l-14.219 0 l0 -27.246 l14.219 0 l0 2.5 z M745.94915625 40 l-2.5977 0 l-1.8164 -23.145 l-9.3359 23.145 l-1.5234 0 l-9.2773 -22.988 l-1.8359 22.988 l-2.6172 0 l2.0117 -27.246 l3.3594 0 l9.1211 22.539 l9.1211 -22.539 l3.3984 0 z"></path>
              </g>
              <g
                id="SvgjsG1257"
                featurekey="sloganFeature-0"
                transform="matrix(3.8258885948652472,0,0,3.8258885948652472,92.49904951290178,12.507937735932838)"
                fill="#fff"
              >
                <path d="M6.9629 20.18555 c-2.959 0 -5.2637 -1.6504 -5.2637 -4.9316 l0 -9.1797 l2.3438 0 l0 8.8574 c0 2.2168 1.2793 3.1641 2.9199 3.1641 s2.9395 -0.95703 2.9395 -3.1641 l0 -8.8574 l2.334 0 l0 9.1797 c0 3.2813 -2.3047 4.9316 -5.2734 4.9316 z M36.01073828125 20 l-2.3145 0 l-0.91797 -10.996 l-3.9941 10.996 l-1.4648 0 l-3.9746 -10.977 l-0.92773 10.977 l-2.3242 0 l1.1133 -13.926 l3.252 0 l3.584 9.8438 l3.6133 -9.8438 l3.252 0 z M48.6317921875 20.18555 c-2.9492 0 -5.1563 -1.4063 -5.6055 -3.8672 l2.4023 -0.55664 c0.25391 1.6016 1.5723 2.4805 3.291 2.4805 c1.3574 0 2.5879 -0.57617 2.5684 -2.041 c-0.019531 -1.5234 -1.709 -1.9629 -3.5352 -2.4805 c-2.1094 -0.61523 -4.2773 -1.3184 -4.2773 -3.877 c0 -2.5977 2.1289 -3.9648 4.7754 -3.9648 c2.4414 0 4.7559 1.0254 5.293 3.5254 l-2.2559 0.56641 c-0.3125 -1.4844 -1.4648 -2.1387 -2.9199 -2.1387 c-1.2988 0 -2.5293 0.55664 -2.5293 1.9727 c0 1.2891 1.4746 1.6895 3.1641 2.1582 c2.1777 0.60547 4.6973 1.3477 4.6973 4.1406 c0 2.8809 -2.4121 4.082 -5.0684 4.082 z"></path>
              </g>
            </svg>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#academics">
                  Academics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link"
                  onClick={() => setLoginOk(true)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#"
                  onClick={() => setRegisterOk(true)}
                >
                  Register
                </Link>
              </li>
            </ul>
            <Modal
              visible={registerOk}
              onCancel={() => {
                setRegisterOk(false);
              }}
              footer={null}
            >
              {<Register />}
            </Modal>
            <Modal
              visible={loginOk}
              onCancel={() => {
                setLoginOk(false);
              }}
              footer={null}
            >
              {<Login />}
            </Modal>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
