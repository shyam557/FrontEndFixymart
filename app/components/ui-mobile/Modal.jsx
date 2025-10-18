"use client";
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <button className="ml-auto block" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}
