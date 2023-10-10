import React, { useState } from "react";
import "./Login.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="headline">Administer System</h1>
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

          <Link to="/main">
            <button type="submit">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
