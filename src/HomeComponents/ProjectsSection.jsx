import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-tl63.onrender.com/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-xl">
        Loading Projects...
      </div>
    );
  }

  return (
    <section
      id="projects-section"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden bg-gradient-to-br from-[#0a0f1f] via-[#14162e] to-[#020617] text-white"
    >
      {/* Crystal glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 blur-3xl rounded-full animate-pulse delay-700"></div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-12 tracking-wide z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
      >
        My Projects
      </motion.h2>

      {projects.length === 0 ? (
        <p className="text-gray-300 text-lg">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl relative z-10">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl" />

              {/* Project image */}
              <div className="overflow-hidden">
                <motion.img
                  src={
                    project.image.startsWith("http")
                      ? project.image
                      : `https://portfolio-backend-tl63.onrender.com${project.image}` // prepend server URL
                  }
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Project content */}
              <div className="p-6 text-left relative z-10">
                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {project.description.length > 120
                    ? project.description.slice(0, 120) + "..."
                    : project.description}
                </p>

                {/* Visit button */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    Visit <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
