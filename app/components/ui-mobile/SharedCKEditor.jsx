"use client";
import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function SharedCKEditor({ value, onChange, label = "", config = {}, disabled = false, height = 300 }) {
  const editorRef = useRef();

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium text-gray-700">{label}</label>}
      <div className="border rounded shadow-sm bg-white">
        <CKEditor
          editor={ClassicEditor}
          data={value}
          disabled={disabled}
          config={{ ...config, height }}
          onReady={editor => {
            editorRef.current = editor;
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>
    </div>
  );
}
