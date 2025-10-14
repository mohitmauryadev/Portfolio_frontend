import React, { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: "", // ✅ now image URL instead of file
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ send JSON body directly (no FormData)
      const res = await axios.post(
        "https://portfolio-backend-tl63.onrender.com/api/project-input",
        {
          title: form.title,
          description: form.description,
          link: form.link,
          image: form.image, // image as URL
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(res.data.message);

      setForm({
        title: "",
        description: "",
        link: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-xl w-full p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add New Project
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
            rows="4"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          ></textarea>

          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Project Link (GitHub / Live URL)"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />

          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Project Image URL (from Google/CDN)"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />

          {/* ✅ Optional live preview */}
          {form.image && (
            <img
              src={form.image}
              alt="Project Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-700"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
