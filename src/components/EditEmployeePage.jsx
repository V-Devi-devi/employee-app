import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    department_id: "",
    designation: "",
    phone: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empResponse = await client.get(`/employees/${id}`);
        setEmployeeData(empResponse.data);

        const deptResponse = await client.get("/departments/");
        setDepartments(deptResponse.data);
      } catch (err) {
        setError("Could not load data.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await client.put(`/employees/${id}`, employeeData);
      alert("Profile updated successfully!");
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update profile.");
    }
  };

  return (
    <div
      className="auth-card"
      style={{ margin: "40px auto", maxWidth: "500px" }}
    >
      <h2 style={{ marginBottom: "20px" }}>Edit Employee #{id}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          textAlign: "left",
        }}
      >
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>
        <label>
          Department:
          <select
            name="department_id"
            onChange={handleChange}
            value={employeeData.department_id}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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
            value={employeeData.phone || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="btn btn-outline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}