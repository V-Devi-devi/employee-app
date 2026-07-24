import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function DepartmentEmployeesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [departmentName, setDepartmentName] = useState("Loading...");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const deptRes = await client.get("/departments/");
        const currentDept = deptRes.data.find((d) => d.id === parseInt(id));
        if (currentDept) setDepartmentName(currentDept.name);
        const empRes = await client.get("/employees/");
        const deptEmployees = empRes.data.filter(
          (emp) => emp.department_id === parseInt(id),
        );
        setEmployees(deptEmployees);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setDepartmentName("Department");
      }
    };
    fetchDetails();
  }, [id]);

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
        <h2 style={{ margin: 0 }}>Employees in {departmentName}</h2>
        <button
          onClick={() => navigate("/departments")}
          className="btn btn-outline"
          style={{ width: "auto", padding: "8px 16px" }}
        >
          &larr; Back to Departments
        </button>
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
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: "white",
                }}
              >
                <td style={{ padding: "12px 16px" }}>{emp.id}</td>
                <td style={{ padding: "12px 16px", fontWeight: "500" }}>
                  {emp.name}
                </td>
                <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                  {emp.email}
                </td>
                <td style={{ padding: "12px 16px" }}>{emp.designation}</td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  No employees found in this department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}