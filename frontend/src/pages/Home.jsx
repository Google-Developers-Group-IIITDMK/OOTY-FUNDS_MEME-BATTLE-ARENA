import { FaGamepad, FaRobot, FaBolt, FaCrown, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-900 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-16 h-16 bg-purple-700 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-700 rounded-full opacity-40"></div>

      <div className="flex items-center gap-2 mb-4 z-10">
        <FaGamepad className="text-3xl text-orange-400" />
      </div>

      <p className="text-center text-lg mb-10 z-10">
        Ultimate Meme Showdown! <br /> Upload your best memes, get AI
        roasts, and battle for the crown!
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-10 z-10">
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-72 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <span className="text-orange-500 text-2xl">👥</span>
            </div>
          </div>