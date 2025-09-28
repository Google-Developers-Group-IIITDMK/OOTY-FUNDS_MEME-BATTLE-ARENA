import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition hover:bg-white/10";
  const active = "bg-white/20";
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-purple-900/60 border-b border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        <Link to="/" className="font-extrabold tracking-wide">
          <span className="text-orange-400">MEME</span> <span className="text-blue-400">ARENA</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={({isActive}) => `${linkBase} ${isActive ? active : ''}`}>Home</NavLink>
          <NavLink to="/create" className={({isActive}) => `${linkBase} ${isActive ? active : ''}`}>Create</NavLink>
          <NavLink to="/join" className={({isActive}) => `${linkBase} ${isActive ? active : ''}`}>Join</NavLink>
          <NavLink to="/arena" className={({isActive}) => `${linkBase} ${isActive ? active : ''}`}>Arena</NavLink>
          <NavLink to="/hall-of-fame" className={({isActive}) => `${linkBase} ${isActive ? active : ''}`}>Hall of Fame</NavLink>
        </div>
      </nav>
    </header>
  );
}
