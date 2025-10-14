import React, { useState } from "react";
import axios from "axios";

const AddArticle = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description1: "",
    description2: "",
    image: "", // ✅ image URL instead of file
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
      // ✅ Send JSON instead of FormData
      const res = await axios.post(
        "https://portfolio-backend-tl63.onrender.com/api/article-input",
        {
          title: form.title,
          author: form.author,
          description1: form.description1,
          description2: form.description2,
          image: form.image, // ✅ sending URL directly
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(res.data.message);

      setForm({
        title: "",
        author: "",
        description1: "",
        description2: "",
        image: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative top-4 min-h-screen flex justify-center items-center bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-xl w-full p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add New Article
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Article Image URL (from Google/CDN)"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />

          {/* ✅ Optional image preview */}
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-700"
            />
          )}

          <textarea
            name="description1"
            value={form.description1}
            onChange={handleChange}
            placeholder="Description 1"
            rows="3"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          ></textarea>

          <textarea
            name="description2"
            value={form.description2}
            onChange={handleChange}
            placeholder="Description 2"
            rows="3"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
