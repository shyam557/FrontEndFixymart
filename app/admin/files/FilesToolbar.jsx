import React from "react";
import { Plus, Share2 } from "lucide-react";

export default function FilesToolbar({ onUpload, onShare, search, setSearch }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded" onClick={onUpload}>
        <Plus size={18} /> Upload Files
      </button>
      <button className="flex items-center gap-2 border px-4 py-2 rounded text-gray-700" onClick={onShare}>
        <Share2 size={18} /> Share
      </button>
      <div className="flex-1" />
      <input
        type="text"
        className="border rounded px-3 py-2 text-sm w-64"
        placeholder="Search files..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}
