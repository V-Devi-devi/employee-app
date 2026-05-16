import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await client.post("/auth/register", { username, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 style={{ marginBottom: "5px" }}>Create Account</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "30px" }}>
          Register to get started
        </p>

        {error && (
          <p
            style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px" }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Choose a password"
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
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "14px", color: "#6b7280" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#0ea5e9",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}