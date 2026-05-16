import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import client from "../api/client";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const isAdmin = decoded?.role === "admin";
  const username = decoded?.sub?.toLowerCase() || "";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await client.get("/employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to fire this employee?")) {
      try {
        await client.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        alert("Failed to delete employee.");
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
        <h2 style={{ margin: 0 }}>Employee Directory</h2>
        {isAdmin && (
          <Link
            to="/employees/new"
            className="btn btn-primary"
            style={{ width: "auto" }}
          >
            Add Employee
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
                Email
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                Designation
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                Phone
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const isMyProfile = emp.email?.toLowerCase().includes(username);
              const canEdit = isAdmin || isMyProfile;

              return (
                <tr
                  key={emp.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: isMyProfile ? "#f0f9ff" : "white",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{emp.id}</td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: isMyProfile ? "600" : "normal",
                    }}
                  >
                    {emp.name}{" "}
                    {isMyProfile && (
                      <span
                        style={{
                          color: "#0ea5e9",
                          fontSize: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        (You)
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                    {emp.email}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{emp.designation}</td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                    {emp.phone || "N/A"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {canEdit && (
                      <Link
                        to={`/employees/${emp.id}/edit`}
                        style={{
                          color: "#0ea5e9",
                          textDecoration: "none",
                          marginRight: "15px",
                          fontWeight: "500",
                        }}
                      >
                        Edit
                      </Link>
                    )}
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(emp.id)}
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
                    )}
                  </td>
                </tr>
              );
            })}
            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}