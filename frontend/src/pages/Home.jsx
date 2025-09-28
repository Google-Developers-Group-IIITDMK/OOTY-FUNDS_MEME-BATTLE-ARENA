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
          <h2 className="font-bold text-lg mb-2">Create Room</h2>
          <p className="text-sm text-gray-500 mb-4">
            Start a new meme battle and invite your friends!
          </p>
          <Link to="/create" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition w-full">
            Create Battle Room
          </Link>
        </div>

        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-72 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaTrophy className="text-blue-500 text-2xl" />
            </div>
          </div>
          <h2 className="font-bold text-lg mb-2">Join Room</h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter a room code to join the battle!
          </p>
          <input
            type="text"
            placeholder="Enter code"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Link to="/join" className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition w-full inline-block text-center">
            Join Battle
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10 z-10">
        <div className="bg-purple-700 px-6 py-4 rounded-xl flex items-center gap-2">
          <FaRobot /> AI-Generated Roasts
        </div>
        <div className="bg-purple-700 px-6 py-4 rounded-xl flex items-center gap-2">
          <FaBolt /> Real-time Voting
        </div>
        <div className="bg-purple-700 px-6 py-4 rounded-xl flex items-center gap-2">
          <FaCrown /> Become Meme Lord
        </div>
      </div>

      <Link to="/hall-of-fame" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold z-10">
        <FaTrophy /> Hall of Fame
      </Link>
    </div>
  );
}
