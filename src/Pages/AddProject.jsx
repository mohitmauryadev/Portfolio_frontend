import React, { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null, // file upload
  });
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
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("image", form.image);

      const res = await axios.post("https://portfolio-backend-tl63.onrender.com/api/project-input", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      setForm({
        title: "",
        description: "",
        link: "",
        image: null,
      });

      // Reset file input manually
      document.getElementById("imageInput").value = "";
    } catch (err) {
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
            type="text"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Project Link"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />
          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />
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
