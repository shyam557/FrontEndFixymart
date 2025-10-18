"use client";
import React, { useState } from "react";
import FileCard from "./FileCard";
import FilesToolbar from "./FilesToolbar";

const TABS = [
  "All Files",
  "Company Files",
  "Service Documents",
  "Training Materials",
  "Trash",
];


const initialFiles = [
  { type: "folder", name: "Corporate Policies", desc: "25 items • Updated 2 days ago", bg: "#f3f0ff" },
  { type: "file", ext: "pdf", icon: "📄", name: "UrbanCo Employee Handbook.pdf", desc: "3.2 MB • Updated 1 week ago", bg: "#e7f0fd" },
  { type: "file", ext: "docx", icon: "📄", name: "Service Provider Guidelines.docx", desc: "2.1 MB • Updated 3 days ago", bg: "#f6eafd" },
  { type: "file", ext: "xlsx", icon: "📄", name: "Service Provider Rates.xlsx", desc: "1.6 MB • Updated yesterday", bg: "#eafaf1" },
  { type: "file", ext: "jpg", icon: "🖼️", name: "Service Uniform Guidelines.jpg", desc: "4.5 MB • Updated 5 days ago", bg: "#f3f3f3" },
  { type: "file", ext: "pptx", icon: "📄", name: "Company Onboarding.pptx", desc: "8.7 MB • Updated 2 weeks ago", bg: "#fdf7e7" },
  { type: "file", ext: "pdf", icon: "📄", name: "Safety Protocols.pdf", desc: "2.8 MB • Updated 1 day ago", bg: "#fdeaea" },
];

export default function FilesPage() {
  const [tab, setTab] = useState(1); // 1 = Company Files
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [files, setFiles] = useState(initialFiles);
  const fileInputRef = React.useRef(null);

  // Handle file upload
  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.value = null;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      let icon = "📄";
      if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) icon = "🖼️";
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        type: "file",
        ext,
        icon,
        name: file.name,
        desc: `${sizeMB} MB • Uploaded now`,
        bg: "#e7f0fd",
        fileObj: file,
      };
    });
    setFiles(prev => [...newFiles, ...prev]);
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Files Management</h1>
      </div>
      <FilesToolbar
        onUpload={handleUploadClick}
        onShare={() => alert("Share")}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex gap-6 border-b mb-6">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`py-2 px-2 border-b-2 text-sm font-semibold transition ${tab === i ? "border-purple-500 text-purple-600" : "border-transparent text-gray-500"}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFiles.map((file, i) => (
          <FileCard key={i} file={file} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
        <span>Showing 1 to 6 of 24 files</span>
        <div className="flex gap-1">
          <button className="border px-2 py-1 rounded">&lt; Previous</button>
          <button className="border px-2 py-1 rounded bg-purple-50 text-purple-600">1</button>
          <button className="border px-2 py-1 rounded">2</button>
          <button className="border px-2 py-1 rounded">3</button>
          <button className="border px-2 py-1 rounded">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}
