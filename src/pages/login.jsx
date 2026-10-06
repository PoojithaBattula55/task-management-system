import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("loggedInUser", "admin");
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      navigate("/user");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>TaskFlow</h1>

        <p className="subtitle">
          Task Management System
        </p>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="switch-text">
          Don't have an account?

          <span onClick={() => navigate("/signup")}>
            {" "}Sign Up
          </span>
        </p>

        <div className="admin-info">
          <p>Admin Login</p>

          <small>
            Email: admin@gmail.com
          </small>

          <small>
            Password: admin123
          </small>
        </div>

      </div>
    </div>
  );
}

export default Login;