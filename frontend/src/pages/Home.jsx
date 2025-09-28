import { useState } from "react";
import { FaGamepad, FaRobot, FaBolt, FaCrown, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env?.VITE_SERVER || "";

  // Create a room
  const createRoom = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        `${API_URL}/api/room/create`,
        {}, // ye body hai ye empty hi jayegi 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      if (res?.data?.success && res.data.room) {
        const { roomCode } = res.data.room;
        setMessage(`Room created: ${roomCode}`);
        navigate(`/room/${roomCode}`); // redirect to room page
      } else {
        setMessage("Failed to create room");
      }

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error creating room");
    } finally {
      setLoading(false);
    }
  };

  // Join a room
  const joinRoom = async () => {
    if (!roomCode) {
      setMessage("Please enter a room code");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/room/join/${roomCode}`,
        {}, // ye body hai ye empty hi jayegi 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.data?.success) {
        navigate(`/room/${roomCode}`); // redirect kana hai
      } else {
        setMessage("Failed to join room");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error joining room");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-16 h-16 bg-purple-700 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-700 rounded-full opacity-40"></div>

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
          <button
            onClick={createRoom}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition w-full"
          >
            {loading ? "Creating..." : "Create Battle Room"}
          </button>
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
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={joinRoom}
            disabled={loading}
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition w-full"
          >
            {loading ? "Joining..." : "Join Battle"}
          </button>
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

      <button
        onClick={() => navigate("/hall-of-fame")}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold z-10"
      >
        <FaTrophy /> Hall of Fame
      </button>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
      >
        Logout
      </button>

      {message && (
        <div className="mt-4 text-center text-sm text-yellow-300">{message}</div>
      )}
    </div>
  );
}