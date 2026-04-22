import API from "../api/axios";

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
      alert("Invalid credentials");
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

      <a href="/register">Create new account</a>
    </div>
  );
}