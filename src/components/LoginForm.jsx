import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await client.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      navigate("/departments");
    } catch (err) {
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 style={{ marginBottom: "5px" }}>Welcome Back</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "30px" }}>
          Sign in to manage employees
        </p>

        {error && (
          <p
            style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px" }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Sign In
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "14px", color: "#6b7280" }}>
          No account?{" "}
          <Link
            to="/register"
            style={{
              color: "#0ea5e9",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}