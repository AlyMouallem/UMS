import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddMajor = () => {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem("auth"))
  );
  const { token } = state;

  const [name, setName] = useState("");
  useEffect(() => {
    const setAuth = () => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + token,
      };
    };
    setAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/majors`, {
        name,
      });

      toast.success(data.message);
      setTimeout(1000, setName(""));
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="container py-2">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Add a major:</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="form-label">
                Enter major name
              </label>
              <input
                required
                placeholder="Major name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
              />
              <button className="btn btn-primary col-12 my-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMajor;
