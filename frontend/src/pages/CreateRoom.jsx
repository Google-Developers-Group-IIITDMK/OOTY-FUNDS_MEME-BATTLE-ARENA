import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function genRoomId() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusable chars
    let id = "";
    for (let i = 0; i < 6; i++) id += alphabet[Math.floor(Math.random() * alphabet.length)];
    return id;
  }

  function handleCreate(e) {
    e.preventDefault();
    if (roomName.trim().length < 3) return setError("Room name must be at least 3 characters");
    if (maxPlayers < 2 || maxPlayers > 32) return setError("Players must be between 2 and 32");
    setError("");
    const roomId = genRoomId();
    // In a real app, you'd create room on the server and get back a code
    navigate(`/room/${roomId}`, { state: { roomName, maxPlayers } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6"><span className="text-orange-300">Create</span> Battle Room</h1>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Room Name</label>
            <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Enter room name" />
          </div>
          <div>
            <label className="block mb-1 text-sm">Max Players</label>
            <Input type="number" min={2} max={32} value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} />
          </div>
          {error && <p className="text-red-200 text-sm">{error}</p>}
          <Button type="submit" className="w-full">🚀 Create Room</Button>
        </form>
      </div>
    </div>
  );
}
