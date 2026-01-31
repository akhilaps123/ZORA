import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // const response = await axios.post("http://127.0.0.1:8000/token/", {
      //   username: credentials.username,
      //   // email: credentials.email,
      //   password: credentials.password,
      // });
      const response = await axios.post("http://127.0.0.1:8000/login/",
  {
    username: credentials.username,
    password: credentials.password,
  }
);

      const isStaff = response.data.is_staff === true;
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("is_staff", isStaff);

      // if (isStaff) {
      //   window.location.href = "http://127.0.0.1:8000"; // Redirect to admin dashboard
      // } else {
      //   navigate("/concert");
      // }

      if (isStaff) {
  // 🔥 STEP 4: Create Django session
  await axios.post(
    "http://127.0.0.1:8000/create-session/",
    {},
    {
      headers: {
        Authorization: `Bearer ${response.data.access}`,
      },
      withCredentials: true, // VERY IMPORTANT
    }
  );

  // 🔁 Now Django knows the admin
    window.location.href = "http://127.0.0.1:8000/admin-dashboard/";
  } else {
  navigate("/concert");
  }

    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="zora-auth-wrapper">
      <div className="zora-auth-card">
        <div className="auth-header text-center mb-4">
          <h2 className="zora-logo">Z<span className="pink-dot">O</span>RA</h2>
          <p className="text-muted">Welcome back to the beat.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group-zora mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="input-group-zora mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="input-group-zora mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="zora-btn-gradient w-100 mb-3">Sign In</button>
          
          {error && <p className="error-msg text-center small">{error}</p>}

          <p className="auth-footer text-center mt-4">
            New to Zora? <Link to="/signup" className="zora-link">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;