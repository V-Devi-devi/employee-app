import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function EditDepartmentPage() {
  const { id } = useParams(); // Grabs the ID from the URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await client.get("/departments/");
        const dept = response.data.find((d) => d.id === parseInt(id));
        if (dept) {
          setName(dept.name);
          setLocation(dept.location);
        }
      } catch (err) {
        setError("Could not load department data.");
      }
    };
    fetchDepartment();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await client.put(`/departments/${id}`, { name, location });
      alert("Department updated successfully!");
      navigate("/departments");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update department.");
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
      <h2>Edit Department #{id}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleUpdate}
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
            backgroundColor: "#ffc107",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Changes
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