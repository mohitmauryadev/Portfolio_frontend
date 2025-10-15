import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setForm({
        name: storedUser.name,
        email: storedUser.email,
        password: storedUser.password,
      });
    }
  }, []);

  // ✅ Admin credentials from environment
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // ✅ Safe check for admin
  const isAdmin =
    user?.email === ADMIN_EMAIL && user?.password === ADMIN_PASSWORD;

  // ✅ Update profile
  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.put(
        `https://portfolio-backend-tl63.onrender.com/api/user/${user._id}`,
        form
      );
      alert(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setUser(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete account
  const handleDelete = async () => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await axios.delete(
        `https://portfolio-backend-tl63.onrender.com/api/user/${user._id}`
      );
      alert("Account deleted successfully");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting account");
    }
  };

  // ✅ If not logged in
  if (!user)
    return (
      <p className="text-center mt-20 text-xl text-gray-400">
        Please login first to view your profile.
      </p>
    );

  // ✅ Admin view
  if (isAdmin) {
    console.log("✅ Logged in as Admin");
    return <AdminDashboard />;
  }

  // ✅ Normal user view
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-6 mt-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-cyan-400"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-cyan-500 text-white text-6xl border-4 border-cyan-400">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        {/* User Info */}
        <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
        <p className="text-gray-300">{user.email}</p>

        {/* Update Form */}
        <div className="mt-6 w-full flex flex-col gap-4">
          <input
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Buttons */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-3 rounded-lg transition-all"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
