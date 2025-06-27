// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/cover");
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome, Reader</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
