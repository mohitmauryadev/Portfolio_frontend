import React, { useState } from "react";
import axios from "axios";

const AddArticle = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description1: "",
    description2: "",
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
      formData.append("author", form.author);
      formData.append("description1", form.description1);
      formData.append("description2", form.description2);
      formData.append("image", form.image);

      const res = await axios.post("https://portfolio-backend-tl63.onrender.com/api/article-input", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      setForm({
        title: "",
        author: "",
        description1: "",
        description2: "",
        image: null,
      });

      // Reset file input manually
      document.getElementById("imageInput").value = "";
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
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            required
          />
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
