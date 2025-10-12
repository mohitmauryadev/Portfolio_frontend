import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const data = [
  "Innovative",
  "Fast",
  "Responsive",
  "Secure",
  "AI-powered",
  "Modern Design",
  "Interactive",
  "Dynamic",
];

const Animates = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []);

  return (
    <div className="w-full h-[300px] flex flex-wrap justify-center items-center gap-6 relative overflow-hidden bg-gray-900 rounded-2xl p-6">
      {items.map((text, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -50, opacity: 0, scale: 0.8 }}
          animate={{ y: [0, -20, 0], opacity: 1, scale: 1 }}
          transition={{
            delay: idx * 0.2,
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="bg-cyan-700/80 backdrop-blur-md text-white font-semibold px-4 py-2 rounded-xl shadow-lg cursor-pointer hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 transition-all"
        >
          {text}
        </motion.div>
      ))}

      {/* Floating background circles with images */}
      <motion.div
        className="absolute w-40 h-40 rounded-full top-10 left-10 overflow-hidden shadow-lg"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      >
        <img src="https://t3.ftcdn.net/jpg/02/14/87/96/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg" alt="Web Development" className="w-full h-full object-cover" />
      </motion.div>

      <motion.div
        className="absolute w-32 h-32 rounded-full bottom-10 right-20 overflow-hidden shadow-lg"
        animate={{ x: [0, -80, 0], y: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      >
        <img src="https://png.pngtree.com/thumb_back/fh260/background/20220823/pngtree-technology-concept-future-demographic-media-photo-image_9098534.jpg" alt="Software Development" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

export default Animates;
