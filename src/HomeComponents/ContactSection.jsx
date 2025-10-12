import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: null, message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: "" });

    try {
      const res = await axios.post("https://portfolio-backend-tl63.onrender.com/api/contact", form);
      setStatus({ loading: false, success: true, message: res.data.message });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message: error.response?.data?.message || "Failed to send message",
      });
    }
  };

  return (
    <section
      id="contact-section"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-[#0a0f1f] via-[#14162e] to-[#020617] text-white overflow-hidden"
    >
      {/* 💎 Background Lights */}
      <div className="absolute top-20 left-16 w-64 h-64 bg-cyan-400/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full animate-pulse delay-700"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl"
      >
        {/* 📝 Left Side - Form */}
        <div>
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 outline-none transition"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 outline-none transition"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 outline-none transition"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message..."
                rows="5"
                required
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 outline-none transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {status.loading ? "Sending..." : "Send Message"} <Send size={18} />
            </button>

            {/* ✅ Success/Error message */}
            {status.message && (
              <p
                className={`mt-3 text-center font-medium ${
                  status.success ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>

        {/* 💬 Right Side - Contact Info */}
        <div className="flex flex-col justify-center items-start md:items-start space-y-6">
          <h3 className="text-3xl font-semibold mb-2">Let's Connect</h3>
          <p className="text-gray-300 leading-relaxed max-w-md">
            Whether you want to collaborate, discuss projects, or just say hi —
            my inbox is always open. Let's build something great together.
          </p>

          <div className="space-y-3 text-gray-300">
            <p>
              📍 <span className="font-medium">Lucknow, India</span>
            </p>
            <p>
              📧 <a href="mailto:mohitmauryabbdu@gmail.com" className="hover:text-cyan-400">mohitmauryabbdu@gmail.com</a>
            </p>
          </div>

          {/* 🌐 Social Icons */}
          <div className="flex items-center gap-5 mt-6">
            <a
              href="https://github.com/mohitmauryadev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-cyan-400/20 transition duration-300"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohitmauryadev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-cyan-400/20 transition duration-300"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:mohitmauryabbdu@gmail.com"
              className="p-3 bg-white/10 rounded-full hover:bg-cyan-400/20 transition duration-300"
            >
              <Mail size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-cyan-400/20 transition duration-300"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
