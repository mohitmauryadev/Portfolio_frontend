import React, { useState } from "react";
import axios from "axios";

const AddSkill = () => {
  const [form, setForm] = useState({ name: "", description: "", image: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("image", form.image);

      const res = await axios.post("https://portfolio-backend-tl63.onrender.com/api/skills-input", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      setForm({ name: "", description: "", image: null });
      document.getElementById("imageInput").value = "";
    } catch (err) {
      alert(err.response?.data?.message || "Error adding skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-900 p-6 pt-28">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Skill</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Skill Name"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            required
          />
          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
