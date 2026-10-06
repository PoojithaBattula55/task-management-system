import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Get existing users from Local Storage
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("User already exists!");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password
    };

    // Add new user
    users.push(newUser);

    // Save users to Local Storage
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Signup successful!");

    // Go back to Login
    navigate("/");
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>TaskFlow</h1>

        <p className="subtitle">
          Create your account
        </p>

        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="switch-text">
          Already have an account?

          <span onClick={() => navigate("/")}>
            {" "}Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;