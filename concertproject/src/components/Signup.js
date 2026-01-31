import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await axios.post("http://127.0.0.1:8000/register/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Welcome to the front row! Signup successful.");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. That username or email might already be taken.");
      console.error("Backend error:", err.response?.data);
    }
  };

  return (
    <div className="zora-auth-wrapper">
      <div className="zora-auth-card">
        <div className="auth-header text-center mb-4">
          <h2 className="zora-logo">Z<span className="pink-dot">O</span>RA</h2>
          <p className="text-muted">Create your account to start booking.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group-zora mb-3">
            <input
              type="text"
              name="username"
              placeholder="Pick a Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-zora mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-zora mb-4">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="zora-btn-gradient w-100 mb-3">Join Zora</button>

          {error && <p className="error-msg text-center small">{error}</p>}

          <p className="auth-footer text-center mt-4">
            Already a member? <Link to="/login" className="zora-link">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;