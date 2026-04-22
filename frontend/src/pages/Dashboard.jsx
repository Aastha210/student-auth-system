import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/me", {
      headers: { Authorization: token }
    })
      .then(res => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

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

      alert("Password updated");

      // logout after change
      localStorage.removeItem("token");
      window.location.href = "/";

    } catch {
      alert("Wrong old password");
    }
  };

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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      <div className="card">
        <h3>Student Details</h3>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Course:</b> {user.course}</p>
      </div>

      <div className="card">
        <h3>Update Password</h3>
        <form onSubmit={updatePassword}>
          <input name="oldPassword" type="password" placeholder="Old Password" required />
          <input name="newPassword" type="password" placeholder="New Password" required />
          <button type="submit">Update Password</button>
        </form>
      </div>

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