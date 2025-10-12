import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaProjectDiagram, FaPenNib, FaLightbulb } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-tl63.onrender.com/api/users");

      // Agar response me data array ke andar hai
      if (res.data.data && Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } 
      // Agar response direct array hai
      else if (Array.isArray(res.data)) {
        setUsers(res.data);
      } 
      else {
        console.error("API response is not an array:", res.data);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };
  fetchUsers();
}, []);


  return (
    <div className="min-h-screen bg-gray-900 p-8 pt-26">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Admin Dashboard
      </h1>


      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <NavLink
          to="/addproject" 
          className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-8 rounded-2xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
        >
          <FaProjectDiagram size={50} className="text-cyan-400 mb-4" />
          <h2 className="text-xl font-bold text-white">Add Project</h2>
        </NavLink>

        <NavLink
          to="/addskill" 
          className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-8 rounded-2xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
        >
          <FaLightbulb size={50} className="text-purple-400 mb-4" />
          <h2 className="text-xl font-bold text-white">Add Skill</h2>
        </NavLink>

        <NavLink
          to="/addarticle" 
          className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-8 rounded-2xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
        >
          <FaPenNib size={50} className="text-green-400 mb-4" />
          <h2 className="text-xl font-bold text-white">Write Article</h2>
        </NavLink>
      </div>

      
      {/* Users Table */}
      <div className="overflow-x-auto mb-10 mt-6">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
            Registered Users
      </h1>
        <table className="min-w-full bg-gray-800 rounded-2xl shadow-lg text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Password</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id || index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.password}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
