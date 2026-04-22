import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  // Fetch user details
  useEffect(() => {
    API.get("/me", {
      headers: { Authorization: token }
    })
      .then(res => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  // Update password
  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        "/update-password",
        {
          oldPassword: e.target.oldPassword.value,
          newPassword: e.target.newPassword.value
        },
        { headers: { Authorization: token } }
      );

      alert("Password updated successfully");

// 🔐 Logout user
localStorage.removeItem("token");

// 🔄 Redirect to login page
window.location.href = "/";
    } catch {
      alert("Wrong old password");
    }
  };

  // Update course
  const updateCourse = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        "/update-course",
        { course: e.target.course.value },
        { headers: { Authorization: token } }
      );

      alert("Course updated");
      window.location.reload();
    } catch {
      alert("Error updating course");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      {/* Student Details */}
      <div className="card">
        <h3>Student Details</h3>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Course:</b> {user.course}</p>
      </div>

      {/* Update Password */}
      <div className="card">
        <h3>Update Password</h3>
        <form onSubmit={updatePassword}>
          <input name="oldPassword" type="password" placeholder="Old Password" required />
          <input name="newPassword" type="password" placeholder="New Password" required />
          <button type="submit">Update Password</button>
        </form>
      </div>

      {/* Update Course */}
      <div className="card">
        <h3>Change Course</h3>
        <form onSubmit={updateCourse}>
          <input name="course" placeholder="New Course" required />
          <button type="submit">Update Course</button>
        </form>
      </div>

      <button onClick={logout}>Logout</button>

    </div>
  );
}