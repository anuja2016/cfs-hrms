// LoginPage.js

import Base from '../components/Base';
import { useState } from "react";
import { loginUser } from "../Utility/UserService";
import { toast } from "react-toastify";
import { doLogin } from '../Auth';
import { useNavigate } from "react-router-dom";
import '../Assets/Styles/dashboard.css'; // Correct the path


const LoginPage = () => {
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validation
    if (
      loginDetail.username.trim() === '' || loginDetail.password.trim() === ''
    ) {
      toast.error("Username or Password is required !!", {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    // Submit the data to the server to generate a token
    loginUser(loginDetail).then((data) => {
      // Save the data to local storage
      doLogin(data, () => {
        console.log("Login detail is saved to local storage");
        navigate("/employee/dashboard");
      });

      toast.success("Login Success!!", {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }).catch(error => {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on the server !!", {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    });
  };

  // Resetting the form
  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  return (
    <Base>
      <div className="stylecontainer">
        <div className="mt-4">
          <div>
            <h3>Login Here !!</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              {/* Username field */}
              <div>
                <label htmlFor="userName">Enter User Name</label>
                <input
                  placeholder="Enter here"
                  type="text"
                  id="userName"
                  value={loginDetail.username}
                  onChange={(e) => handleChange(e, "username")}
                />
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password">Enter Password</label>
                <input
                  placeholder="Enter here"
                  type="password"
                  id="password"
                  value={loginDetail.password}
                  onChange={(e) => handleChange(e, "password")}
                />
              </div>

              <div className="text-center">
                <button type="submit">Login</button>
                <button
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default LoginPage;
