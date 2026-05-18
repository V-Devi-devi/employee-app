import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import DepartmentList from "./components/DepartmentList";
import EmployeeList from "./components/EmployeeList";
import EditDepartmentPage from "./components/EditDepartmentPage";
import EditEmployeePage from "./components/EditEmployeePage";
import CreateDepartmentPage from "./components/CreateDepartmentPage";
import CreateEmployeePage from "./components/CreateEmployeePage";
import LandingPage from "./components/LandingPage";
import DepartmentEmployeesPage from "./components/DepartmentEmployeesPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/departments"
            element={
              <ProtectedRoute>
                <DepartmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/:id/edit"
            element={
              <ProtectedRoute requireAdmin={true}>
                <EditDepartmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id/edit"
            element={
              <ProtectedRoute>
                <EditEmployeePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/new"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CreateDepartmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/:id/employees"
            element={
              <ProtectedRoute requireAdmin={true}>
                <DepartmentEmployeesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/new"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CreateEmployeePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;