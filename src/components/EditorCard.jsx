import React, { useState } from "react";
import { getPath } from "../utils/fsHelpers";

// File editor card: lets the user view and edit content of the selected file
export default function EditorCard({ nodes, selectedId, onSaveContent }) {
  const selectedNode = nodes[selectedId];
  const isFile = selectedNode && selectedNode.type === "file";

  // Local state initialized to selected file content (re-initialized when key={selectedId} changes)
  const [draftContent, setDraftContent] = useState(
    isFile ? selectedNode.content || "" : "",
  );

  // Handle Save click
  const handleSave = () => {
    if (isFile) {
      onSaveContent(draftContent);
    }
  };

  // Info line text
  let infoText = "Select a file to edit its content.";
  if (isFile) {
    const fullPath = getPath(nodes, selectedNode.id);
    const size = (selectedNode.content || "").length;
    infoText = `Editing: ${fullPath} (size ${size} chars)`;
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-3 flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
      <div>
        {/* Card Title */}
        <h2 className="text-[15px] font-bold text-[#0d9488] mb-1">
          2. File Editor
        </h2>

        {/* Grey Info Line */}
        <p className="text-[13px] text-[#64748b] truncate mb-2">{infoText}</p>

        {/* Textarea */}
        <textarea
          disabled={!isFile}
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          placeholder={
            isFile
              ? "Write file content here..."
              : "Select a file from the tree to edit..."
          }
          className={`w-full h-[90px] text-[13px] font-mono p-2 border border-slate-300 rounded-[6px] outline-none resize-none transition ${
            isFile
              ? "bg-white focus:border-[#0d9488]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        />
      </div>

      {/* Save Button Row */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[12px] text-slate-400">
          {isFile
            ? `1 block = 20 chars (${Math.max(1, Math.ceil(draftContent.length / 20))} needed)`
            : ""}
        </span>
        <button
          onClick={handleSave}
          disabled={!isFile}
          className={`text-[13px] font-medium px-[14px] py-[7px] rounded-[6px] transition ${
            isFile
              ? "bg-[#0d9488] text-white hover:opacity-90 cursor-pointer"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          Save (write)
        </button>
      </div>
    </div>
  );
}
