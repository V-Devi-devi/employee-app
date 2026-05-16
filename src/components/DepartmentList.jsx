import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import client from "../api/client";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const isAdmin = decoded?.role === "admin";
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await client.get("/departments/");
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await client.delete(`/departments/${id}`);
        fetchDepartments();
      } catch (error) {
        alert("Failed to delete department.");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Company Departments</h2>
        {isAdmin && (
          <Link
            to="/departments/new"
            className="btn btn-primary"
            style={{ width: "auto" }}
          >
            Add Department
          </Link>
        )}
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead
            style={{
              backgroundColor: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                Location
              </th>
              {isAdmin && (
                <th
                  style={{
                    padding: "12px 16px",
                    color: "#4b5563",
                    fontSize: "14px",
                  }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr
                key={dept.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: "white",
                }}
              >
                <td style={{ padding: "12px 16px" }}>{dept.id}</td>
                <td style={{ padding: "12px 16px", fontWeight: "500" }}>
                  {dept.name}
                </td>
                <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                  {dept.location}
                </td>
                {isAdmin && (
                  <td style={{ padding: "12px 16px" }}>
                    <Link
                      to={`/departments/${dept.id}/employees`}
                      style={{
                        color: "#10b981",
                        textDecoration: "none",
                        marginRight: "15px",
                        fontWeight: "500",
                      }}
                    >
                      View
                    </Link>

                    <Link
                      to={`/departments/${dept.id}/edit`}
                      style={{
                        color: "#0ea5e9",
                        textDecoration: "none",
                        marginRight: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      style={{
                        color: "#ef4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td
                  colSpan={isAdmin ? "4" : "3"}
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}