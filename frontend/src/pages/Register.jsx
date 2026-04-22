import API from "../api/axios";

export default function Register() {
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        course: e.target.course.value
      });

      alert("Registered successfully");
window.location.href = "/";

    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  alert(err.response?.data?.msg || "Registration failed");
}
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input name="password" placeholder="Password" type="password" required />
        <input name="course" placeholder="Course" />
        <button>Register</button>
      </form>
    </div>
  );
}