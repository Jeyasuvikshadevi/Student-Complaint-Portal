import { useEffect, useState } from "react";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/complaints"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const data = await response.json();

      setComplaints(data);
      setError("");
    } catch (err) {
      setError("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const highCount = complaints.filter(
    (item) => item.priority === "HIGH"
  ).length;

  const mediumCount = complaints.filter(
    (item) => item.priority === "MEDIUM"
  ).length;

  const lowCount = complaints.filter(
    (item) => item.priority === "LOW"
  ).length;

  const filteredComplaints = complaints.filter((item) =>
    `${item.studentName} ${item.complaint} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* Dashboard Header */}

      <div className="dashboard-header">
        <div>
          <div className="page-label">▣ ADMIN PANEL</div>

          <h1>Admin Dashboard</h1>

          <p>
            Monitor and manage student complaints
          </p>
        </div>

        <div className="date-box">
          📅
          <div>
            <strong>{new Date().toLocaleDateString()}</strong>
            <span>Today's Overview</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}

      <div className="stats-container">

        <div className="stat-card total-card">
          <div className="stat-icon">▤</div>

          <div>
            <p>Total Complaints</p>
            <h2>{complaints.length}</h2>
            <span>All submitted complaints</span>
          </div>

          <div className="card-arrow">→</div>
        </div>

        <div className="stat-card high-card">
          <div className="stat-icon">!</div>

          <div>
            <p>High Priority</p>
            <h2>{highCount}</h2>
            <span>Needs immediate attention</span>
          </div>

          <div className="card-arrow">→</div>
        </div>

        <div className="stat-card medium-card">
          <div className="stat-icon">!</div>

          <div>
            <p>Medium Priority</p>
            <h2>{mediumCount}</h2>
            <span>Requires follow up</span>
          </div>

          <div className="card-arrow">→</div>
        </div>

        <div className="stat-card low-card">
          <div className="stat-icon">✓</div>

          <div>
            <p>Low Priority</p>
            <h2>{lowCount}</h2>
            <span>Normal priority</span>
          </div>

          <div className="card-arrow">→</div>
        </div>

      </div>

      {/* Complaints Table */}

      <div className="complaints-section">

        <div className="section-heading">
          <div>
            <h2>▤ All Complaints</h2>

            <p>
              View and manage all student complaints
            </p>
          </div>

          <div className="table-actions">

            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={fetchComplaints}>
              ↻ Refresh
            </button>

          </div>
        </div>

        {loading && (
          <p className="loading-text">
            Loading complaints...
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {filteredComplaints.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      <strong>{item.studentName}</strong>
                    </td>

                    <td className="complaint-text">
                      {item.complaint}
                    </td>

                    <td>
                      <span className="category-label">
                        {item.category}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td>
                      <span className="status-badge">
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredComplaints.length === 0 && (
              <p className="empty-message">
                No complaints found.
              </p>
            )}

          </div>
        )}

        <div className="table-footer">
          Showing {filteredComplaints.length} of{" "}
          {complaints.length} complaints
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;