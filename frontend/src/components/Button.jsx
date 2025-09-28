export default function Button({ children, className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400",
    secondary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400",
    ghost: "bg-white/10 hover:bg-white/20 text-white focus:ring-white/30",
    outline: "border border-white/30 text-white hover:bg-white/10 focus:ring-white/30",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
