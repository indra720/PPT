import React, { useState } from 'react';

// Demo 3: Recycle Bin Simulator (Soft Delete vs Permanent Erase)
export default function RecycleBinDemo() {
  const [files, setFiles] = useState([
    'assignment.docx',
    'photo.jpg',
    'budget.xlsx',
    'notes.txt',
  ]);
  const [bin, setBin] = useState([]);

  // Moves file from Documents to the Recycle Bin
  const handleDelete = (fileName) => {
    setFiles(files.filter((f) => f !== fileName));
    setBin([...bin, fileName]);
  };

  // Restores file from Recycle Bin back to Documents
  const handleRestore = (fileName) => {
    setBin(bin.filter((f) => f !== fileName));
    setFiles([...files, fileName]);
  };

  // Permanently erases file from the Recycle Bin
  const handleErase = (fileName) => {
    setBin(bin.filter((f) => f !== fileName));
  };

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        3. Recycle Bin Simulator
      </h3>
      <p className="text-[12px] text-[#64748b] mb-4">
        Delete sends a file to the bin. From the bin you can restore it or delete it for good.
      </p>

      {/* Two columns: Documents & Recycle Bin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Documents Box */}
        <div className="border border-[#e2e8f0] rounded-[8px] p-3.5 bg-white shadow-sm min-h-[220px]">
          <h4 className="font-bold text-[13px] text-slate-800 mb-2.5 flex items-center gap-1.5">
            <span>Documents</span>
          </h4>

          {files.length === 0 ? (
            <p className="text-slate-400 text-[13px] py-4 text-center">empty</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="py-1.5 flex items-center justify-between text-[13px]"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-slate-400">📄</span>
                    <span className="text-slate-700">{file}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(file)}
                    className="bg-[#dc2626] text-white text-[11px] font-medium px-2.5 py-1 rounded hover:opacity-90 transition shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recycle Bin Box */}
        <div className="border border-[#e2e8f0] rounded-[8px] p-3.5 bg-white shadow-sm min-h-[220px]">
          <h4 className="font-bold text-[13px] text-slate-800 mb-2.5 flex items-center gap-1.5">
            <span>🗑</span>
            <span>Recycle Bin</span>
          </h4>

          {bin.length === 0 ? (
            <p className="text-slate-400 text-[13px] py-4 text-center">Bin is empty</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {bin.map((file, idx) => (
                <div
                  key={idx}
                  className="py-1.5 flex items-center justify-between text-[13px]"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-slate-400">📄</span>
                    <span className="text-slate-700">{file}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleRestore(file)}
                      className="bg-[#0d9488] text-white text-[11px] font-medium px-2.5 py-1 rounded hover:opacity-90 transition"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleErase(file)}
                      className="bg-[#dc2626] text-white text-[11px] font-medium px-2.5 py-1 rounded hover:opacity-90 transition"
                    >
                      Erase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

