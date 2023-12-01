import React, { useState } from "react";
import "./Login.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      const user = response.data;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/pages/testManagement");
      } else {
        alert("Invalid login credentials.");
      }
    } catch (error) {
      // Handle the error based on the error response from your backend
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="headline">Administrator System</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">
              <i className="icon icon-email"></i>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <i className="icon icon-password"></i>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
