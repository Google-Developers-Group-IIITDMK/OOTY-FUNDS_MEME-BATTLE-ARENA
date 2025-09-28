export default function HallOfFame() {
  const winners = [
    { name: "DankLord99", score: 128 },
    { name: "PixelPirate", score: 113 },
    { name: "MemeSmith", score: 97 },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Hall of Fame</h1>
        <ul className="space-y-3">
          {winners.map((w, i) => (
            <li key={i} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">#{i + 1}</span>
                <span className="font-semibold">{w.name}</span>
              </div>
              <span className="text-white/80">{w.score} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
