import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function JoinRoom() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleJoin(e) {
    e.preventDefault();
    if (code.trim().length < 4) return setError("Please enter a valid room code (min 4 chars)");
    if (name.trim().length < 2) return setError("Please enter your display name");
    setError("");
    navigate(`/room/${code.toUpperCase()}`, { state: { displayName: name } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6"><span className="text-orange-300">Join</span> Battle Room</h1>
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Room Code</label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
          </div>
          <div>
            <label className="block mb-1 text-sm">Your Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </div>
          {error && <p className="text-red-200 text-sm">{error}</p>}
          <Button type="submit" className="w-full">🎯 Join Battle</Button>
        </form>
      </div>
    </div>
  );
}