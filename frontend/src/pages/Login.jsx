import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // ✅ FIX ADDED

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email: e.target.email.value,
        password: e.target.password.value
      });

      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);

      const token = res.data?.token;

      if (!token) {
        alert("Login failed: token missing");
        return;
      }

      localStorage.setItem("token", token);

      // ✅ proper React navigation
      navigate("/dashboard");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Invalid login");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Create new account</Link>
    </div>
  );
}