import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-tl63.onrender.com/api/articles");
        setArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-gray-400">
        Loading Articles...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-[#0f172a] to-gray-900 text-gray-100 flex flex-col items-center py-16 px-6">
      {/* Section Header */}
      <h2 className="text-4xl font-extrabold mb-12 text-center mt-14">
        Latest <span className="text-indigo-500">Articles</span>
      </h2>

      {/* Articles List */}
      {articles.length === 0 ? (
        <p className="text-lg opacity-80">No articles available yet.</p>
      ) : (
        <div className="flex flex-col gap-10 max-w-5xl w-full">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Article Image */}
              <div className="w-full md:w-1/3 overflow-hidden rounded-xl">
                <img
                  src={
                    article.image.startsWith("http")
                      ? article.image
                      : `https://portfolio-backend-tl63.onrender.com${article.image}` // prepend server URL
                  }
                  alt={article.title}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Article Content */}
              <div className="w-full md:w-2/3 text-gray-200">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {article.title}
                </h3>

                <div className="flex items-center gap-2 mb-4 text-sm opacity-80">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>

                <p className="text-sm leading-relaxed mb-3 opacity-90">
                  {article.description1}
                </p>
                <p className="text-sm leading-relaxed opacity-75">
                  {article.description2}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArticlesSection;
