import React, { useState } from 'react';

// Demo 4: Duplicate File Finder using hash comparisons
export default function DuplicateDemo() {
  const [scanned, setScanned] = useState(false);

  // File list with simulated cryptographic hash and sizes
  const files = [
    { name: 'holiday.jpg', hash: 'a91f', size: '2.1 MB' },
    { name: 'holiday_copy.jpg', hash: 'a91f', size: '2.1 MB' },
    { name: 'cv.pdf', hash: '5c20', size: '300 KB' },
    { name: 'cv_final.pdf', hash: '7be3', size: '310 KB' },
    { name: 'song.mp3', hash: 'a91f9', size: '4 MB' },
    { name: 'holiday (2).jpg', hash: 'a91f', size: '2.1 MB' },
    { name: 'cv_old.pdf', hash: '5c20', size: '300 KB' },
  ];

  // Count occurrences of each hash
  const hashCounts = {};
  files.forEach((file) => {
    hashCounts[file.hash] = (hashCounts[file.hash] || 0) + 1;
  });

  // Calculate total extra duplicate copies: for each hash with n > 1, add (n - 1)
  let duplicateCount = 0;
  Object.values(hashCounts).forEach((count) => {
    if (count > 1) {
      duplicateCount += count - 1;
    }
  });

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        4. Duplicate File Finder
      </h3>
      <p className="text-[12px] text-[#64748b] mb-3">
        Files with the same content give the same hash, so duplicates can be found without opening them.
      </p>

      {/* Button & Detection Status */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => setScanned(!scanned)}
          className="bg-[#0d9488] text-white text-[12px] font-medium px-3 py-1.5 rounded-[6px] hover:opacity-90 transition"
        >
          {scanned ? 'Reset scan' : 'Scan for duplicates'}
        </button>

        {scanned && (
          <span className="text-[13px] font-medium text-slate-700">
            {duplicateCount} duplicate files found (marked in yellow)
          </span>
        )}
      </div>

      {/* File List Table with mobile horizontal scroll safety */}
      <div className="border border-[#e2e8f0] rounded-[8px] overflow-x-auto bg-white shadow-sm">
        <div className="min-w-[320px] divide-y divide-slate-100">
          {files.map((file, idx) => {
            const isDuplicate = scanned && hashCounts[file.hash] > 1;

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: isDuplicate ? 'rgba(245, 158, 11, 0.25)' : undefined,
                }}
                className="px-3 py-2 flex items-center justify-between text-[13px] transition"
              >
                <div className="flex-1 min-w-0 flex items-center gap-2 pr-2">
                  <span className="text-slate-400">📄</span>
                  <span className="font-medium text-slate-800 truncate">{file.name}</span>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                  <span className="text-slate-500 font-mono text-[12px]">
                    {file.size}
                  </span>

                  {scanned && (
                    <span className="text-slate-600 font-mono text-[12px] w-20 sm:w-24 text-right">
                      hash: {file.hash}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

