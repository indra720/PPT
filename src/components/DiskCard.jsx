import React from 'react';
import { getFileColor } from '../utils/fsHelpers';

// Disk card: renders 64 blocks showing allocation per file in a 16-column grid
export default function DiskCard({ disk, nodes }) {
  // Count how many blocks are used (not null)
  const usedCount = disk.filter((fileId) => fileId !== null).length;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-3 flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
      <div>
        {/* Card Title */}
        <h2 className="text-[15px] font-bold text-[#0d9488] mb-1">
          3. Disk Blocks (allocation)
        </h2>

        {/* Info header */}
        <p className="text-[13px] text-[#64748b] mb-2.5">
          Simulated hard disk space divided into 64 blocks (20 chars each).
        </p>

        {/* 16-column grid for 64 blocks with horizontal scroll for small mobile screens */}
        <div className="w-full overflow-x-auto pb-1">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
              gap: '3px',
              minWidth: '340px',
            }}
            className="select-none"
          >
            {disk.map((fileId, blockIndex) => {
              const isUsed = fileId !== null;
              const fileName = isUsed && nodes[fileId] ? nodes[fileId].name : 'Free';
              const bgColor = isUsed ? getFileColor(fileId) : '#e2e8f0';

              return (
                <div
                  key={blockIndex}
                  title={`Block ${blockIndex}: ${fileName}`}
                  style={{ backgroundColor: bgColor }}
                  className={`h-[24px] rounded-[3px] flex items-center justify-center text-[9px] font-semibold transition-all hover:scale-110 cursor-pointer ${
                    isUsed ? 'text-white' : 'text-[#64748b]'
                  }`}
                >
                  {blockIndex}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Small grey text below */}
      <div className="mt-2.5 pt-2 border-t border-slate-100">
        <p className="text-[12px] text-[#64748b]">
          Each file gets its own colour. Grey = free block. Used: <strong className="font-bold text-[#1e293b]">{usedCount}</strong>/64
        </p>
      </div>
    </div>
  );
}

