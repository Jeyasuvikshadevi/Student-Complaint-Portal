import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Smart Complaint System</h2>

        <div>
          <Link to="/">Student</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;