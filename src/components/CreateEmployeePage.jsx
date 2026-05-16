import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    department_id: "",
    designation: "",
    phone: "",
  });
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await client.get("/departments/");
        setDepartments(response.data);
        if (response.data.length > 0) {
          setEmployeeData((prev) => ({
            ...prev,
            department_id: response.data[0].id,
          }));
        }
      } catch (err) {
        console.error("Could not load departments for dropdown.");
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/employees/", employeeData);
      alert("Employee created successfully!");
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create employee.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>Hire New Employee</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Department:
          <select
            name="department_id"
            onChange={handleChange}
            value={employeeData.department_id}
            required
            style={{ width: "100%", padding: "5px" }}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} (ID: {dept.id})
              </option>
            ))}
          </select>
        </label>

        <label>
          Designation:
          <select
            name="designation"
            onChange={handleChange}
            value={employeeData.designation}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Select a role...
            </option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="Intern">Intern</option>
            <option value="Student">Student</option>
          </select>
        </label>
        <label>
          Phone:{" "}
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Create Employee
        </button>
        <button
          type="button"
          onClick={() => navigate("/employees")}
          style={{
            padding: "10px",
            backgroundColor: "#ccc",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}