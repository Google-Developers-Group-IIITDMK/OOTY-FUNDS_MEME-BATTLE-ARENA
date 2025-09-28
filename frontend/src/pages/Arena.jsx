import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { uploadMeme, voteMeme } from "../api/memeApi.jsx"; // your API helpers

function MemeCard({ title, onVote, disabled, image, onSelectImage }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-white">
      <label className="aspect-square bg-black/30 rounded-xl mb-3 flex items-center justify-center text-4xl overflow-hidden cursor-pointer hover:bg-black/40 transition">
        {image ? (
          <img src={image} alt="meme" className="w-full h-full object-cover" />
        ) : (
          <span className="text-white/70">🖼️ Upload Meme</span>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={onSelectImage} />
      </label>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold truncate">{title}</h3>
        <Button variant="secondary" onClick={onVote} disabled={disabled}>
          {disabled ? "Voted" : "Vote"}
        </Button>
      </div>
    </div>
  );
}

export default function Arena() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const roomName = location.state?.roomName || null;

  const [votesA, setVotesA] = useState(0);
  const [votesB, setVotesB] = useState(0);
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [roundId, setRoundId] = useState(() => `round-${Date.now()}`);
  const [roastOpen, setRoastOpen] = useState(false);
  const [winnerOpen, setWinnerOpen] = useState(false);
  const [winnerText, setWinnerText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const voteKey = `arena-voted-${roomId || 'global'}-${roundId}`;

  useEffect(() => {
    const v = localStorage.getItem(voteKey);
    setHasVoted(!!v);
  }, [voteKey]);

  const totalVotes = votesA + votesB;
  const pct = (v) => (totalVotes === 0 ? 0 : Math.round((v / totalVotes) * 100));

  const handleNewRound = () => {
    setVotesA(0);
    setVotesB(0);
    setImageA("");
    setImageB("");
    const newId = `round-${Date.now()}`;
    setRoundId(newId);
  };

  const endRoundAndShowWinner = () => {
    let text = "It's a tie! Both memes share the crown 👑";
    if (votesA > votesB) text = `Meme A wins ${votesA}-${votesB}!`;
    if (votesB > votesA) text = `Meme B wins ${votesB}-${votesA}!`;
    setWinnerText(text);
    setWinnerOpen(true);
  };

  const handleVote = async (side) => {
    if (hasVoted) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in first");
      navigate("/signin");
      return;
    }

    const voteData = {
      roomId,
      roundId,
      side, // "A" or "B"
    };

    try {
      const res = await voteMeme(voteData, token);
      if (res.data.success) {
        if (side === "A") setVotesA((v) => v + 1);
        if (side === "B") setVotesB((v) => v + 1);
        localStorage.setItem(voteKey, "1");
        setHasVoted(true);
      } else {
        alert(res.data.message || "Vote failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Vote failed");
    }
  };

  const handleUpload = async (file, side) => {
    if (!file) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in first");
      navigate("/signin");
      return;
    }

    const formData = new FormData();
    formData.append("meme", file);
    formData.append("roomId", roomId);
    formData.append("side", side);

    try {
      setLoading(true);
      const res = await uploadMeme(formData, token);
      if (res.data?.url) {
        if (side === "A") setImageA(res.data.url);
        if (side === "B") setImageB(res.data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">
            Battle Arena {roomName ? `• ${roomName}` : ""}
          </h1>
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>

        <div className="text-white/80 mb-6 flex items-center gap-4 flex-wrap">
          {roomId && (
            <span>
              Room:{" "}
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded">
                {roomId}
              </span>
            </span>
          )}
          <span>
            Round: <span className="font-mono">{roundId}</span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <MemeCard
            title={`Meme A • ${votesA} votes (${pct(votesA)}%)`}
            onVote={() => handleVote("A")}
            disabled={hasVoted}
            image={imageA}
            onSelectImage={(e) => handleUpload(e.target.files?.[0], "A")}
          />
          <MemeCard
            title={`Meme B • ${votesB} votes (${pct(votesB)}%)`}
            onVote={() => handleVote("B")}
            disabled={hasVoted}
            image={imageB}
            onSelectImage={(e) => handleUpload(e.target.files?.[0], "B")}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button onClick={() => setRoastOpen(true)}>🤖 Generate AI Roast</Button>
          <Button variant="ghost" onClick={endRoundAndShowWinner}>
            🏁 End Round
          </Button>
          <Button variant="outline" onClick={handleNewRound}>
            🔄 New Round
          </Button>
        </div>
      </div>

      <Modal isOpen={roastOpen} onClose={() => setRoastOpen(false)} title="AI Roast">
        <p className="text-gray-700">
          This meme is so dated, even Internet Explorer left the chat. Try again with fewer pixels and more humor!
        </p>
      </Modal>

      <Modal isOpen={winnerOpen} onClose={() => setWinnerOpen(false)} title="Round Result">
        <p className="text-gray-700 mb-3">{winnerText}</p>
        <div className="text-gray-700 space-y-1">
          <p>Meme A: {votesA} votes ({pct(votesA)}%)</p>
          <p>Meme B: {votesB} votes ({pct(votesB)}%)</p>
        </div>
      </Modal>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-white text-xl">
          Uploading…
        </div>
      )}

      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-800 px-4 py-2 rounded-lg text-white z-50">
          {message}
        </div>
      )}
    </div>
  );
}
