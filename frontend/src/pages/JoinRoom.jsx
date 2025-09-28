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
