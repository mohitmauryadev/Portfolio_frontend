import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-tl63.onrender.com/api/skills"); 
        setSkills(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-xl">
        Loading Skills...
      </div>
    );
  }

  return (
    <section
      id="skills-section"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-[#0a0f1f] via-[#14162e] to-[#020617] text-white"
    >
      {/* Glass Light Effect Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-extrabold text-white mb-12 tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
          My Skills
        </h2>

        {skills.length === 0 ? (
          <p className="text-gray-300 text-lg">No skills found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20 
                transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:scale-[1.04]"
              >
                {/* Gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl" />

                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full border border-white/30 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    <img
                      src={
                        skill.image.startsWith("http")
                          ? skill.image
                          : `https://portfolio-backend-tl63.onrender.com${skill.image}`
                      }
                      alt={skill.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-[0_1px_5px_rgba(255,255,255,0.2)]">
                    {skill.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed px-2">
                    {skill.description}
                  </p>

                  <div className="mt-6 w-16 h-[2px] mx-auto bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition duration-700" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soft floating blur shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </section>
  );
};

export default SkillsSection;
