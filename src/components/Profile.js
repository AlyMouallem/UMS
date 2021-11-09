import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem("auth"))
  );
  const { user, token } = state;
  const { name, email, _id } = user;
  const [nameE, setNameE] = useState(name);
  const [emailE, setEmailE] = useState(email);

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  useEffect(() => {
    const setAuth = () => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + token,
      };
    };
    setAuth();
  }, [token]);

  const handleChange = async () => {
    try {
      const { data } = await axios.put(`/api/users/${_id}`, {
        name: nameE,
        email: emailE,
      });
      const { token, user } = data;

      toast.success(data.message);
      window.localStorage.setItem("auth", JSON.stringify({ token, user }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await axios.delete(`/api/users/${_id}`);
      console.log(result);

      const keysToRemove = ["auth", "courses", "registered"];
      keysToRemove.map((key) => {
        window.localStorage.removeItem(key);
        return true;
      });
      window.location = "/";
      setState(null);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {state && state.user && state.user.name && (
        <div className="container">
          <div className="row p-3">
            <div className="col-2"></div>
            <div className="col-8">
              <h1>Edit your information</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    {!editName ? (
                      <td>{nameE}</td>
                    ) : (
                      <td>
                        <input
                          value={nameE}
                          className="edit "
                          type="text"
                          onChange={(e) => setNameE(e.target.value)}
                        />
                      </td>
                    )}
                    <td>
                      <AiOutlineEdit
                        onClick={() => setEditName(!editName)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    {!editEmail ? (
                      <td>{emailE}</td>
                    ) : (
                      <td>
                        <input
                          value={emailE}
                          className="edit"
                          type="text"
                          onChange={(e) => setEmailE(e.target.value)}
                        />
                      </td>
                    )}
                    <td>
                      <AiOutlineEdit
                        onClick={() => setEditEmail(!editEmail)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                </thead>
              </table>
              <button
                onClick={handleChange}
                className="btn btn-primary mx-auto d-block"
              >
                Submit
              </button>
              <hr />
              <button
                onClick={handleDelete}
                className="btn btn-danger mx-auto d-block"
              >
                Delete your account?
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
