import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { scroller } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const toggleTheme = () => {
    const nt = theme === "dark" ? "light" : "dark";
    setTheme(nt);
    localStorage.setItem("theme", nt);
    document.documentElement.classList.toggle("dark", nt === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // redirect to home after logout
  };

  const handleScroll = (to) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(to, { smooth: true, duration: 800, offset: -80 });
      }, 500);
    } else {
      scroller.scrollTo(to, { smooth: true, duration: 800, offset: -80 });
    }
  };

  const navLinks = [
    { name: "Home", to: "home-section" },
    { name: "About", to: "about-section" },
    { name: "Skills", to: "skills-section" },
    { name: "Projects", to: "projects-section" },
    { name: "Contact", to: "contact-section" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-transparent border-b border-white/20 dark:border-gray-700 transition-all duration-500 pt-2.5 pb-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            Nexo<span className="text-blue-400 dark:text-gray-200">vate</span>
          </motion.span>
        </Link>

        {/* Mobile toggle */}
        <div
          className="md:hidden text-gray-400 dark:text-white text-2xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </div>

        {/* Nav links */}
        <ul
          className={`md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black/70 dark:bg-black/20 backdrop-blur-lg md:bg-transparent rounded-b-2xl md:rounded-none shadow-lg md:shadow-none transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible md:visible md:opacity-100"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name} className="mx-4 my-3 md:my-0 text-center">
              <span
                onClick={() => handleScroll(link.to)}
                className="text-lg font-medium px-3 py-1 rounded-md transition duration-300 cursor-pointer text-gray-300 dark:text-gray-200 hover:text-cyan-400"
              >
                {link.name}
              </span>
            </li>
          ))}

          {/* Articles link */}
          <li className="mx-4 my-3 md:my-0 text-center">
            <Link
              to="/articles"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-medium px-3 py-1 rounded-md transition duration-300 ${
                location.pathname === "/articles"
                  ? "text-cyan-400 dark:text-cyan-300 border-b-2 border-cyan-400"
                  : "text-gray-300 dark:text-gray-200 hover:text-cyan-400"
              }`}
            >
              Articles
            </Link>
          </li>

          {/* Theme toggle
          <li className="mx-4 my-3 md:my-0 text-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-110 transition-transform duration-300"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li> */}

          {/* User / Profile */}
          <li className="mx-4 my-3 md:my-0 text-center relative">
            {user ? (
              <div className="relative">
                <div
                  className="bg-cyan-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl uppercase cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {user.name.charAt(0)}
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50">
                    <p
                      onClick={() => navigate("/profile")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-800"
                    >
                      Profile
                    </p>
                    <p
                      onClick={handleLogout}
                      className="px-4 py-2 cursor-pointer text-red-400 hover:bg-gray-700 dark:hover:bg-gray-800"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-white font-medium hover:scale-105 transition-transform duration-300"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
