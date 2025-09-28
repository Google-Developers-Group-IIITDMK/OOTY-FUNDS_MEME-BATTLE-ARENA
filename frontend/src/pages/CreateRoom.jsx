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
    