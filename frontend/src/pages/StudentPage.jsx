import { useState } from "react";

function StudentPage() {
  const [studentName, setStudentName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!studentName || !complaint || !category) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName,
            complaint,
            category,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Complaint submitted successfully! Priority: ${data.priority}`
        );

        setStudentName("");
        setComplaint("");
        setCategory("");
      } else {
        setMessage(data.message || "Submission failed");
      }
    } catch (error) {
      setMessage("Backend connection failed");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Student Complaint Portal</h1>

        <p>Submit your complaint to the administration</p>

        <form onSubmit={submitComplaint}>
          <input
            type="text"
            placeholder="Enter your name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <textarea
            placeholder="Enter your complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">
            Submit Complaint
          </button>
        </form>

        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
}

export default StudentPage;