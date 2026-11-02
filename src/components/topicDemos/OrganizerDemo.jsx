import React, { useState } from 'react';

// Demo 2: Auto File Organizer by file extension
export default function OrganizerDemo() {
  const [organized, setOrganized] = useState(false);

  // List of initial messy files
  const fileList = [
    'photo1.jpg',
    'resume.pdf',
    'song.mp3',
    'notes.txt',
    'movie.mp4',
    'report.docx',
    'logo.png',
    'setup.exe',
  ];

  // Grouped folders categorization rule
  const categories = {
    Images: fileList.filter((f) => f.endsWith('.jpg') || f.endsWith('.png')),
    Documents: fileList.filter(
      (f) => f.endsWith('.pdf') || f.endsWith('.txt') || f.endsWith('.docx')
    ),
    Music: fileList.filter((f) => f.endsWith('.mp3')),
    Videos: fileList.filter((f) => f.endsWith('.mp4')),
    Others: fileList.filter(
      (f) =>
        !f.endsWith('.jpg') &&
        !f.endsWith('.png') &&
        !f.endsWith('.pdf') &&
        !f.endsWith('.txt') &&
        !f.endsWith('.docx') &&
        !f.endsWith('.mp3') &&
        !f.endsWith('.mp4')
    ),
  };

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        2. Auto File Organizer
      </h3>
      <p className="text-[12px] text-[#64748b] mb-3">
        Moves files from a messy folder into Images, Documents, Music, Videos, Others by extension.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setOrganized(true)}
          className="bg-[#0d9488] text-white text-[12px] font-medium px-3 py-1.5 rounded-[6px] hover:opacity-90 transition"
        >
          Organize Downloads
        </button>
        <button
          onClick={() => setOrganized(false)}
          className="bg-white border border-[#cbd5e1] text-slate-700 text-[12px] font-medium px-3 py-1.5 rounded-[6px] hover:bg-slate-50 transition"
        >
          Undo
        </button>
      </div>

      {/* Folder Container */}
      <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white shadow-sm w-full">
        {!organized ? (
          <div>
            <div className="flex items-center gap-2 font-bold text-[14px] text-slate-800 mb-2">
              <span>📁</span>
              <span>Downloads (messy)</span>
            </div>
            <div className="pl-6 space-y-1">
              {fileList.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[13px] text-slate-700 py-0.5">
                  <span className="text-slate-400">📄</span>
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 font-bold text-[14px] text-slate-800 mb-3">
              <span>📁</span>
              <span>Downloads (organized)</span>
            </div>

            <div className="pl-4 space-y-3">
              {Object.entries(categories).map(([category, files]) => (
                <div key={category} className="text-[13px]">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span>📁</span>
                    <span>
                      {category} ({files.length})
                    </span>
                  </div>
                  <div className="pl-6 text-slate-600 font-mono text-[12px] mt-0.5">
                    {files.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

