// About4.jsx
import React from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Heart } from "lucide-react";
import Tilt from "react-parallax-tilt";

const About = () => {
  const cards = [
    {
      icon: <Code size={32} className="text-indigo-400" />,
      title: "Skills",
      description:
        "Expert in React, Node.js, Java, TailwindCSS, and building responsive web applications.",
    },
    {
      icon: <Briefcase size={32} className="text-indigo-400" />,
      title: "Experience",
      description:
        "Worked on multiple projects involving full-stack development, APIs, and real-world applications.",
    },
    {
      icon: <Heart size={32} className="text-indigo-400" />,
      title: "Passion",
      description:
        "Passionate about coding, problem-solving, fitness, and exploring the intersection of tech & spirituality.",
    },
  ];

  return (
    <section id="about-section"  className="relative bg-gray-900 dark:bg-gray-900/90 py-28">

         {/* Heading */}
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

             <div className="container mx-auto px-6 lg:px-20 mb-16">
                <motion.div
                  className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/20 rounded-3xl shadow-xl border border-white/20 p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Left - Text */}
                  <div className="flex-1 space-y-6">
                    <motion.h2
                      className="text-4xl lg:text-5xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      Mohit Maurya
                    </motion.h2>
                    <p className="text-white/80 text-lg leading-relaxed">
                      B.Tech in <span className="font-semibold text-indigo-400">Computer Science Engineering</span> 
                      from BBD University, Lucknow. Passionate about <span className="font-semibold text-indigo-400">web and app development</span>, building modern, responsive, and user-friendly applications.
                    </p>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Skilled in <span className="font-semibold text-indigo-400">React, Node.js, Java, Python</span> and always exploring new technologies to craft efficient and maintainable code.
                    </p>
        
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <span className="material-icons text-white">email</span>
                        <span className="text-white/80 text-sm">mohitmauryabbdu@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <span className="material-icons text-white">phone</span>
                        <span className="text-white/80 text-sm">+91 9919736684</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <span className="material-icons text-white">location_on</span>
                        <span className="text-white/80 text-sm">Lucknow, UP</span>
                      </div>
                    </div>
                  </div>
        
                  {/* Right - Profile Image */}
                  <div className="flex justify-center lg:justify-end">
                    <motion.img
                      src="https://www.shutterstock.com/image-photo/asian-teenager-students-doing-robot-600nw-2221748207.jpg" 
                      alt="Mohit Maurya"
                      className="w-80 h-80 object-cover rounded-3xl border border-white/30 shadow-2xl"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              </div>
      {/* Optional subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20 pointer-events-none"></div>

      <div className="relative container mx-auto px-6 lg:px-20 z-10">
       

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-12">
          {cards.map((card, index) => (
            <Tilt
              key={index}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.05}
              transitionSpeed={2000}
              className="cursor-pointer"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-indigo-500/40 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <div className="mb-5">{card.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-gray-200 text-lg">{card.description}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
