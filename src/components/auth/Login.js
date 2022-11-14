import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {    
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      };

      try {

        const { data } = await axios.get("/private", config);
        setPrivateData(data.data);

      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [privateData]);


  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {"Content-Type": "application/json"}
    };

    try {

      const { data } = await axios.post("/auth/login", {email, password}, config);
      localStorage.setItem("authToken", data.token);
      navigate("/e-commerce")
      

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {setError("")}, 5000);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken")
    
  }


  return (
    !localStorage.getItem("authToken") ?
      <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
          <h3 className="login-screen__title">Login</h3>
          {error && <span className="error-message">{error}</span>}
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:
              <Link to="/forgotpassword" 
              className="login-screen__forgotpassword"
              tabIndex={4}
              >
                  Forgot Password?
              </Link>          
            </label>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" tabIndex={3}>
            Login
          </button>

          <span className="login-screen__subtext">
            Do not have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    :
      <div>
        <div style={{background: "green", color: "white"}}>
          {privateData}
        </div>

        <button onClick={() => logoutHandler()}>Logout</button>
      </div>
  );
};

export default Login;