import Switch from "react-switch";

const AuthForm = ({
  handleSubmit,
  first_name,
  setFirstName,
  last_name,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  register,
  majors,
  major,
  setMajor,
  instructor,
  setInstructor,
}) => {
  const text = register || "Login";

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            {register && (
              <>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    placeholder="Enter your first name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                    id="first_name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    placeholder="Enter your last name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                    id="last_name"
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                placeholder="Enter password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {register && (
                <>
                  <label htmlFor="role" className="pt-3">
                    <span>Instructor?</span>
                    <Switch
                      id="role"
                      checked={instructor}
                      onChange={() => setInstructor(!instructor)}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      className="react-switch"
                      height={20}
                      width={48}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 1)"
                    />
                  </label>
                </>
              )}
            </div>

            {register && !instructor && (
              <>
                <div className="mb-3">
                  <label htmlFor="major" className="form-label">
                    Choose your major
                  </label>
                  <select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="Select Major"
                    className="form-select"
                    id="major"
                    required
                  >
                    <option disabled hidden value="">
                      Select a major
                    </option>
                    {majors.map((majorr, index) => {
                      return (
                        <option key={index + 1} value={majorr}>
                          {majorr}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}

            <button
              disabled={!email || !password}
              type="submit"
              className="btn btn-primary col-12"
            >
              {loading ? "Loading" : text}
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default AuthForm;
