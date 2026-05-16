import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function CreateDepartmentPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("HQ"); // Default value like your backend
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/departments/", { name, location });
      alert("Department created successfully!");
      navigate("/departments"); // Send them back to the list
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create department.");
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
      <h2>Create New Department</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label>
          Department Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: "100%", marginTop: "5px" }}
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
          }}
        >
          Create Department
        </button>
        <button
          type="button"
          onClick={() => navigate("/departments")}
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