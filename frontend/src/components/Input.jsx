export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-white/20 bg-white/10 text-white placeholder-white/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
