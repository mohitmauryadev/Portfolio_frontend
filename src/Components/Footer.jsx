import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa";

const Footer = () => {
  // ✅ Smooth Scroll Function
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative text-white overflow-hidden bg-gradient-to-b from-black via-[#050a0f] to-[#0a0a0a] border-t border-white/10 scroll-smooth">
      {/* ✨ Crystal light reflections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-10 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[200px] rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-white/10 to-transparent blur-[200px] opacity-20 rotate-45"></div>
      </div>

      {/* 💎 Floating reflective line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[150%] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent top-1/2 left-[-25%] animate-[shine_6s_linear_infinite]" />
      </div>

      {/* 💠 Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed">
            I'm <span className="text-cyan-400 font-medium">Mohit Maurya</span>,
            a passionate Web & App Developer focused on creating futuristic,
            aesthetic, and high-performance digital experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Quick Links
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <button
                onClick={() => handleScroll("projects-section")}
                className="hover:text-cyan-400 transition-all bg-transparent border-none focus:outline-none"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("skills-section")}
                className="hover:text-cyan-400 transition-all bg-transparent border-none focus:outline-none"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("contact-section")}
                className="hover:text-cyan-400 transition-all bg-transparent border-none focus:outline-none"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                 href="https://drive.google.com/file/d/1hNt7AbjJdh9hX3f4-23RYFC42P2vESJi/view?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-all bg-transparent border-none focus:outline-none"
              >
                Resume
              </button>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Connect
          </h2>
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/mohitmauryadev?tab=repositories"
              target="_blank"
              className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohitmauryadev"
              target="_blank"
              className="hover:text-blue-400 hover:scale-110 transition-all duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:mohitmauryabbdu@gmail.com"
              className="hover:text-red-400 hover:scale-110 transition-all duration-300"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-sky-400 hover:scale-110 transition-all duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Contact
          </h2>
          <p className="text-gray-300">
            Email:{" "}
            <span className="text-cyan-400">mohitmauryabbdu@gmail.com</span>
          </p>
          <p className="text-gray-300">Phone: +91 9919736684</p>
          <p className="text-gray-300">Location: Lucknow, India</p>
        </div>
      </div>

      {/* 🌌 Divider Line */}
      <div className="relative text-center py-6 border-t border-white/10 text-gray-500 text-sm bg-gradient-to-r from-transparent via-white/5 to-transparent">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        © {new Date().getFullYear()}{" "}
        <span className="text-cyan-400 font-medium">Mohit Maurya</span>. All
        rights reserved.
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); opacity: 0.2; }
          50% { transform: translateX(100%); opacity: 0.6; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

