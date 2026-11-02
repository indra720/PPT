import React, { useState } from 'react';
import { flattenTree, getPath } from '../utils/fsHelpers';

// Directory tree card: displays the hierarchy, search filter, action buttons, and status
export default function TreeCard({
  nodes,
  selectedId,
  onSelectNode,
  onAddFolder,
  onAddFile,
  onRename,
  onDelete,
  onReset,
  statusMessage,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Current path of the selected node
  const currentPath = nodes[selectedId] ? getPath(nodes, selectedId) : '/';

  // Get flat list of tree items to render with indentation
  const allItems = flattenTree(nodes, 0);

  // Filter items by search query (case-insensitive)
  const filteredItems = searchQuery.trim() === ''
    ? allItems
    : allItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-3 flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
      <div>
        {/* Card Title */}
        <h2 className="text-[15px] font-bold text-[#0d9488] mb-1">
          1. Directory Tree
        </h2>

        {/* Current Path Info */}
        <p className="text-[13px] font-mono text-[#64748b] truncate mb-2">
          Current: {currentPath}
        </p>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files and folders..."
          className="w-full text-[13px] px-2.5 py-1.5 border border-slate-300 rounded-[6px] mb-2.5 outline-none focus:border-[#0d9488]"
        />

        {/* Action Buttons Row */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <button
            onClick={onAddFolder}
            className="bg-[#0d9488] text-white text-[13px] font-medium px-[11px] py-[7px] rounded-[6px] hover:opacity-90 transition"
          >
            + Folder
          </button>
          <button
            onClick={onAddFile}
            className="bg-[#0d9488] text-white text-[13px] font-medium px-[11px] py-[7px] rounded-[6px] hover:opacity-90 transition"
          >
            + File
          </button>
          <button
            onClick={onRename}
            className="bg-[#f59e0b] text-[#1e293b] text-[13px] font-medium px-[11px] py-[7px] rounded-[6px] hover:opacity-90 transition"
          >
            Rename
          </button>
          <button
            onClick={onDelete}
            className="bg-[#dc2626] text-white text-[13px] font-medium px-[11px] py-[7px] rounded-[6px] hover:opacity-90 transition"
          >
            Delete
          </button>
          <button
            onClick={onReset}
            className="bg-[#f59e0b] text-[#1e293b] text-[13px] font-medium px-[11px] py-[7px] rounded-[6px] hover:opacity-90 transition"
          >
            Reset
          </button>
        </div>

        {/* Tree Container */}
        <div className="max-h-[300px] overflow-y-auto border border-slate-200 rounded-[6px] p-1 bg-slate-50">
          {filteredItems.length === 0 ? (
            <p className="text-[13px] text-slate-400 p-2 text-center">No match found.</p>
          ) : (
            filteredItems.map((item) => {
              const isSelected = item.id === selectedId;
              const isFolder = item.type === 'dir';

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectNode(item.id)}
                  style={{ paddingLeft: `${item.depth * 18 + 8}px` }}
                  className={`flex items-center gap-1.5 py-1 pr-2 rounded-[4px] cursor-pointer text-[13px] select-none transition ${
                    isSelected
                      ? 'bg-[#0d9488] text-white font-medium'
                      : 'text-[#1e293b] hover:bg-slate-200'
                  }`}
                >
                  <span className="text-[14px]">{isFolder ? '📁' : '📄'}</span>
                  <span className="truncate">{item.name}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 13px Grey Status Line */}
      <div className="mt-2.5 pt-2 border-t border-slate-100">
        <p className="text-[13px] text-[#64748b] truncate">
          {statusMessage || 'Ready'}
        </p>
      </div>
    </div>
  );
}

