import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaMicrophone, FaMicrophoneSlash, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent";

  // Text-to-Speech
  const speak = (text) => {
    if (!voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice = speechSynthesis.getVoices().find(v => v.lang.startsWith("en")) || null;
    window.speechSynthesis.speak(utterance);
  };

  // Voice Input Setup
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setPrompt(transcript);
      handleAsk(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  // Gemini Query
  const handleAsk = async (customPrompt) => {
    const query = customPrompt || prompt;
    if (!query.trim()) return;

    setLoading(true);
    const newMessages = [...response, { sender: "You", text: query }];
    setResponse(newMessages);

    try {
      const res = await axios.post(
        `${GEMINI_API}?key=${GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: query }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn’t understand that.";
      setResponse(prev => [...prev, { sender: "AI", text }]);
      speak(text);
      setPrompt("");
    } catch (error) {
      console.error(error);
      setResponse(prev => [...prev, { sender: "AI", text: "Error connecting to Gemini API." }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  // Auto Greet
  useEffect(() => {
    if (open) {
      const greeting = "Hello, welcome to Mohit Maurya's portfolio. How can I help you?";
      setResponse([{ sender: "AI", text: greeting }]);
      speak(greeting);
    }
  }, [open]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50"
      >
        {open ? <FaTimes size={24} /> : <FaRobot size={28} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 lg:w-[400px] h-[500px] md:h-[550px] bg-[#0a0f16]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 text-white z-50 flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
            <h2 className="font-semibold text-lg text-cyan-400">AI Assistant</h2>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              {voiceEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 p-2 bg-black/30 rounded-lg border border-white/5 text-sm scrollbar-thin">
            {response.map((msg, idx) => (
              <div
                key={idx}
                className={`my-1 p-2 rounded-xl max-w-[80%] ${
                  msg.sender === "You" ? "bg-cyan-600 self-end text-white" : "bg-gray-800 self-start text-gray-300"
                }`}
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 rounded-lg bg-black/40 border border-white/20 text-sm text-white resize-none focus:outline-none h-16"
          />

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full transition-all ${listening ? "bg-red-500" : "bg-cyan-600"}`}
            >
              {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>

            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
