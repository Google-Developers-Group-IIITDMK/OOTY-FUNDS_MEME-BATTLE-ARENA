import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";

function MemeCard({ title, onVote, disabled, image, onSelectImage }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-white">
      <label className="block aspect-square bg-black/30 rounded-xl mb-3 flex items-center justify-center text-4xl overflow-hidden cursor-pointer hover:bg-black/40 transition">
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