export default function Card({ className = "", children }) {
  return (
    <div className={`bg-white text-gray-900 rounded-2xl shadow-xl p-6 ${className}`}>
      {children}
    </div>
  );
}
