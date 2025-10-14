import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Mail, Phone, MapPin } from "lucide-react";

const Hero = () => {
    return (
        <section id="home-section" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] text-white">

            {/* Glowing Background Circles */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-16 right-10 w-72 h-72 bg-gradient-to-tr from-pink-500 to-purple-400 rounded-full blur-3xl opacity-25"></div>

            {/* Profile Circle */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 text-4xl font-semibold shadow-lg shadow-blue-500/30"
            >
                MM
            </motion.div>

            {/* Name */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl font-bold mt-6"
            >
                Mohit Maurya
            </motion.h1>

            {/* Auto Writer */}
            <div className="text-xl mt-2 text-purple-300">
                <Typewriter
                    options={{
                        strings: [
                            "Full Stack Developer 💻",
                            "Web Developer 🌐",
                            "Problem Solver 🧩",
                            "Tech Explorer 🚀",
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 70,
                    }}
                />
            </div>

            {/* Education Info Glass Box */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-8 backdrop-blur-xl bg-white/10 px-6 py-4 rounded-2xl border border-white/20 shadow-lg max-w-md w-full"
            >
                <p className="text-lg font-medium">
                    B.Tech Computer Science & Engineering
                </p>
                <p className="text-sm text-gray-300">Babu Banarasi Das University, Lucknow</p>
            </motion.div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-xl border border-white/10 text-sm">
                    <Mail size={16} />
                    mohitmauryabbdu@gmail.com
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-xl border border-white/10 text-sm">
                    <Phone size={16} />
                    +91 9919736684
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-xl border border-white/10 text-sm">
                    <MapPin size={16} />
                    Lucknow, UP
                </div>
            </div>

            {/* Explore Button */}
            <div className="flex gap-6">
                <motion.a
                    href="https://www.linkedin.com/in/mohitmauryadev"
                    whileHover={{ scale: 1.05 }}
                    className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-400/40 transition"
                >
                    Hire Me
                </motion.a>

                <motion.a
                     href="/public/My_Resume.docx"
                    download="My_Resume.docx"
                    target="_blank"
                    rel="noopener noreferrer"

                    whileHover={{ scale: 1.05 }}
                    className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-400/40 transition"
                >
                    Resume
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;
