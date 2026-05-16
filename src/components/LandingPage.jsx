import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        <div
          style={{ color: "#0ea5e9", fontSize: "40px", marginBottom: "10px" }}
        >
          ◆
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "15px" }}>
          Employee Management System
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            marginBottom: "40px",
            lineHeight: "1.5",
          }}
        >
          Keep track of your employees with ease. Add, view, and manage
          department records all in one place.
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link
            to="/login"
            className="btn btn-primary"
            style={{ width: "auto" }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="btn btn-outline"
            style={{ width: "auto" }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}