import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  let username = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub;
    } catch (e) {
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!token) return null;

  return (
    <header className="navbar">
      <div className="nav-brand">
        <span style={{ color: "#0ea5e9", fontSize: "24px" }}>◆</span>
        Employee Management System
      </div>

      <div className="nav-links">
        <Link to="/departments" className="nav-link">
          Departments
        </Link>
        <Link to="/employees" className="nav-link">
          Employees
        </Link>

        <span
          style={{ marginLeft: "15px", fontSize: "14px", color: "#6b7280" }}
        >
          Hi, <b>{username}</b>
        </span>
        <button
          onClick={handleLogout}
          className="btn btn-outline"
          style={{ width: "auto", padding: "6px 12px", marginLeft: "10px" }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}