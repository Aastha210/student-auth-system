import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Login() {
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email: e.target.email.value,
        password: e.target.password.value
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";

    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" required />
        <input name="password" placeholder="Password" type="password" required />
        <button>Login</button>
      </form>

      <Link to="/register">Create new account</Link>
    </div>
  );
}