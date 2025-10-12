import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Home from "./HomeComponents/Home";
import ArticlesSection from "./Components/ArticlesSection";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/AdminDashboard";
import AddProject from "./Pages/AddProject";
import AddSkill from "./Pages/AddSkill";
import AddArticle from "./Pages/AddArticle";
import Footer from "./Components/Footer";
import Chatbot from "./Chatbot";

const App = () => {
  return (
    <div>
    <Router>
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-black dark:via-gray-900 dark:to-gray-950 min-h-screen text-white transition-colors duration-500">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/addskill" element={<AddSkill />} />
          <Route path="/addarticle" element={<AddArticle />} />
        </Routes>
      </div>
    </Router>
    <Chatbot/>
      <Footer/>
    </div>
  );
};

export default App;
