import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <MainRouter />
    </Router>
  );
}

export default App;
