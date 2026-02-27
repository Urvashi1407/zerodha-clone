import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3002/api/login", {
        email: form.email,
        password: form.password,
      });

      alert(res.data.msg || "Login successful");

      // store token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-success w-100">Login</button>

              <p className="text-center mt-3">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
