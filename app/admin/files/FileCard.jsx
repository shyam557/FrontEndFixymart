import React from "react";
import { MoreVertical } from "lucide-react";

const fileIcons = {
  pdf: "text-blue-500",
  docx: "text-purple-500",
  xlsx: "text-green-500",
  pptx: "text-yellow-500",
  jpg: "text-gray-400",
  folder: "text-purple-400",
};

export default function FileCard({ file }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col min-w-[260px] min-h-[170px] relative group">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition"><MoreVertical size={20} /></button>
      <div className={`flex-1 flex flex-col items-center justify-center ${file.bg || ''} rounded-lg mb-4`} style={{background: file.bg}}>
        {file.type === "folder" ? (
          <span className="text-4xl"><i className="ri-folder-2-line" /></span>
        ) : (
          <span className={`text-5xl ${fileIcons[file.ext] || "text-gray-400"}`}>{file.icon}</span>
        )}
        <div className="mt-2 text-xs font-semibold text-gray-400">{file.ext ? file.ext.toUpperCase() : ""}</div>
      </div>
      <div className="font-semibold mb-1 truncate" title={file.name}>{file.name}</div>
      <div className="text-xs text-gray-500 truncate">{file.desc}</div>
    </div>
  );
}
