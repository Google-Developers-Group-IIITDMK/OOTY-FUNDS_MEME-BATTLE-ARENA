import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-900 text-white flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="text-white/80">This page wandered off into meme land.</p>
        <Link to="/"><Button>Go Home</Button></Link>
      </div>
    </div>
  );
}
