import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";

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
  const roomName = location.state?.roomName || null;
  const [votesA, setVotesA] = useState(0);
  const [votesB, setVotesB] = useState(0);
  const [roastOpen, setRoastOpen] = useState(false);
  const [winnerOpen, setWinnerOpen] = useState(false);
  const [winnerText, setWinnerText] = useState("");
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [roundId, setRoundId] = useState(() => `round-${Date.now()}`);
  const [hasVoted, setHasVoted] = useState(false);

  // Key helpers for localStorage
  const voteKey = `arena-voted-${roomId || 'global'}-${roundId}`;

  useEffect(() => {
    // Check if the user already voted in this round
    const v = localStorage.getItem(voteKey);
    setHasVoted(!!v);
  }, [voteKey]);

  const totalVotes = votesA + votesB;
  const pct = (v) => (totalVotes === 0 ? 0 : Math.round((v / totalVotes) * 100));

  function handleVote(side) {
    if (hasVoted) return; // extra guard
    if (side === "A") setVotesA((v) => v + 1);
    if (side === "B") setVotesB((v) => v + 1);
    localStorage.setItem(voteKey, "1");
    setHasVoted(true);
  }

  function handleNewRound() {
    setVotesA(0);
    setVotesB(0);
    setImageA("");
    setImageB("");
    const newId = `round-${Date.now()}`;
    setRoundId(newId);
    // hasVoted will be recomputed via effect for new voteKey
  }

  function endRoundAndShowWinner() {
    const a = votesA;
    const b = votesB;
    let text = "It's a tie! Both memes share the crown 👑";
    if (a > b) text = `Meme A wins ${a}-${b}!`;
    if (b > a) text = `Meme B wins ${b}-${a}!`;
    setWinnerText(text);
    setWinnerOpen(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-1">Battle Arena {roomName ? `• ${roomName}` : ''}</h1>
        <div className="text-white/80 mb-6 flex items-center gap-4 flex-wrap">
          {roomId && (
            <span>Room: <span className="font-mono bg-white/10 px-2 py-0.5 rounded">{roomId}</span></span>
          )}
          <span>Round: <span className="font-mono">{roundId}</span></span>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <MemeCard
            title={`Meme A • ${votesA} votes (${pct(votesA)}%)`}
            onVote={() => handleVote("A")}
            disabled={hasVoted}
            image={imageA}
            onSelectImage={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = URL.createObjectURL(f);
              setImageA(url);
            }}
          />
          <MemeCard
            title={`Meme B • ${votesB} votes (${pct(votesB)}%)`}
            onVote={() => handleVote("B")}
            disabled={hasVoted}
            image={imageB}
            onSelectImage={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = URL.createObjectURL(f);
              setImageB(url);
            }}
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button onClick={() => setRoastOpen(true)}>🤖 Generate AI Roast</Button>
          <Button variant="ghost" onClick={endRoundAndShowWinner}>🏁 End Round</Button>
          <Button variant="outline" onClick={handleNewRound}>🔄 New Round</Button>
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
    </div>
  );
}