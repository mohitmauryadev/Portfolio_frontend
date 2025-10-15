
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Load admin credentials from environment (Vite format)
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://portfolio-backend-tl63.onrender.com/api/login",
        form
      );

      if (!res.data?.data) {
        throw new Error("Invalid response from server");
      }

      const userData = res.data.data;
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Admin check (compare from env)
      if (
        userData.email === ADMIN_EMAIL &&
        userData.password === ADMIN_PASSWORD
      ) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 dark:bg-gray-800">
      <div className="bg-gray-800 dark:bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 transition-colors p-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
