export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-lg w-full p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
