import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Demo 1: Mini File System Explorer showing folder navigation and contents
export default function ExplorerDemo() {
  // Folder tree data with contents
  const folderData = {
    'C:\\Users\\Documents': [
      { name: 'College', type: 'Folder', size: '-' },
      { name: 'resume.pdf', type: 'PDF', size: '120 KB' },
      { name: 'notes.txt', type: 'Text', size: '4 KB' },
      { name: 'report.docx', type: 'Word', size: '860 KB' },
    ],
    'C:\\Users\\Pictures': [
      { name: 'vacation.jpg', type: 'JPEG Image', size: '2.1 MB' },
      { name: 'logo.png', type: 'PNG Image', size: '450 KB' },
    ],
    'C:\\Projects': [
      { name: 'react-app', type: 'Folder', size: '-' },
      { name: 'database.sql', type: 'SQL File', size: '48 KB' },
    ],
  };

  const [currentFolder, setCurrentFolder] = useState('C:\\Users\\Documents');

  return (
    <div>
      {/* Panel Heading & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        1. File System Explorer
      </h3>
      <p className="text-[12px] text-[#64748b] mb-4">
        Browse a folder tree and see name, type, size of items.
      </p>

      {/* Two columns: Folders on left, Contents on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Folders tree */}
        <div className="md:col-span-4 border border-[#e2e8f0] rounded-[8px] p-3 bg-white">
          <p className="text-[13px] font-bold text-[#1e293b] mb-2">Folders</p>
          <div className="text-[13px] space-y-1 select-none">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <span>📁</span>
              <span>C:</span>
            </div>
            <div className="pl-4 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <span>📁</span>
                <span>Users</span>
              </div>
              <div className="pl-4 space-y-1">
                <button
                  onClick={() => setCurrentFolder('C:\\Users\\Documents')}
                  className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition ${
                    currentFolder === 'C:\\Users\\Documents'
                      ? 'bg-[#0d9488] text-white font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>📁</span>
                  <span>Documents</span>
                </button>
                <button
                  onClick={() => setCurrentFolder('C:\\Users\\Pictures')}
                  className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition ${
                    currentFolder === 'C:\\Users\\Pictures'
                      ? 'bg-[#0d9488] text-white font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>📁</span>
                  <span>Pictures</span>
                </button>
              </div>
              <button
                onClick={() => setCurrentFolder('C:\\Projects')}
                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition ${
                  currentFolder === 'C:\\Projects'
                    ? 'bg-[#0d9488] text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📁</span>
                <span>Projects</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Selected Folder Details */}
        <div className="md:col-span-8 border border-[#e2e8f0] rounded-[8px] p-3 bg-white">
          <p className="text-[13px] font-bold text-[#1e293b] mb-2 font-mono">
            {currentFolder}
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[300px] divide-y divide-slate-100">
              {folderData[currentFolder]?.map((file, idx) => (
                <div
                  key={idx}
                  className="py-2 px-1 flex items-center justify-between text-[13px] hover:bg-slate-50 transition"
                >
                  <div className="flex-1 min-w-0 flex items-center gap-2 pr-2">
                    <span>{file.type === 'Folder' ? '📁' : '📄'}</span>
                    <span className="font-medium text-[#1e293b] truncate">{file.name}</span>
                  </div>
                  <div className="text-slate-500 w-20 text-left text-[12px] sm:text-[13px] shrink-0">{file.type}</div>
                  <div className="text-slate-500 text-right font-mono text-[11px] sm:text-[12px] w-16 shrink-0">
                    {file.size}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
            <span className="text-slate-400">Sample static tree view</span>
            <Link
              to="/"
              className="text-[#0d9488] font-medium hover:underline flex items-center gap-1"
            >
              Open Full Interactive Simulator &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

