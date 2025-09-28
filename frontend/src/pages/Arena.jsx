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