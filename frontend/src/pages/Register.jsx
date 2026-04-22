import API from "../api/axios";

export default function Register() {
  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        course: e.target.course.value
      });

      alert("Registered successfully");

      // redirect to login
      window.location.href = "/";

    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={submit}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <input name="course" placeholder="Course" required />

        <button type="submit">Register</button>
      </form>

      <a href="/">Already have an account? Login</a>
    </div>
  );
}