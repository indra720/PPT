import React, { useState } from 'react';

// Demo 5: File Allocation Simulator (Contiguous, Linked, Indexed)
export default function AllocationDemo() {
  const [method, setMethod] = useState('Linked');

  // Allocation block mapping for 24 blocks (0 to 23)
  const allocationMaps = {
    Contiguous: {
      0: 'A', 1: 'A', 2: 'A',
      3: 'B', 4: 'B', 5: 'B', 6: 'B',
      7: 'C', 8: 'C',
    },
    Linked: {
      0: 'A', 5: 'A', 9: 'A',
      2: 'B', 6: 'B', 12: 'B', 15: 'B',
      3: 'C', 18: 'C',
    },
    Indexed: {
      1: 'iA', 4: 'A', 8: 'A', 10: 'A',
      7: 'iB', 0: 'B', 11: 'B', 14: 'B', 20: 'B',
      13: 'iC', 17: 'C', 22: 'C',
    },
  };

  // OS Theory explanation per method
  const explanations = {
    Contiguous:
      'Blocks of a file are side by side. Fast access, but free space gets split (external fragmentation) and files cannot grow easily.',
    Linked:
      'Each block stores the address of the next block. No external fragmentation, but only sequential access and one broken pointer loses the file.',
    Indexed:
      'One index block (i) lists all data blocks of the file. Fast direct access and no fragmentation, but the index block needs extra space.',
  };

  // Color lookup for file blocks and index blocks
  const getBlockStyle = (val) => {
    switch (val) {
      case 'A':
        return { bg: '#0d9488', text: 'text-white' };
      case 'B':
        return { bg: '#f59e0b', text: 'text-white' };
      case 'C':
        return { bg: '#6366f1', text: 'text-white' };
      case 'iA':
        return { bg: '#0f766e', text: 'text-white' };
      case 'iB':
        return { bg: '#b45309', text: 'text-white' };
      case 'iC':
        return { bg: '#4338ca', text: 'text-white' };
      default:
        return { bg: '#e2e8f0', text: 'text-slate-500' };
    }
  };

  const currentMap = allocationMaps[method];

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        5. File Allocation Simulator
      </h3>
      <p className="text-[12px] text-[#64748b] mb-3">
        Shows where files A (3 blocks), B (4 blocks) and C (2 blocks) are stored on a 24 block disk.
      </p>

      {/* Allocation Method Selector Buttons */}
      <div className="flex items-center gap-2 mb-4">
        {['Contiguous', 'Linked', 'Indexed'].map((type) => (
          <button
            key={type}
            onClick={() => setMethod(type)}
            className={`text-[12px] font-medium px-3 py-1.5 rounded-[6px] transition ${
              method === type
                ? 'bg-[#0d9488] text-white'
                : 'bg-white border border-[#cbd5e1] text-slate-700 hover:bg-slate-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 24-block grid (12 columns x 2 rows) with horizontal scroll for small screens */}
      <div className="w-full overflow-x-auto pb-2 mb-3">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '4px',
            minWidth: '420px',
          }}
          className="select-none"
        >
          {Array.from({ length: 24 }).map((_, blockIdx) => {
            const val = currentMap[blockIdx];
            const isUsed = Boolean(val);
            const style = getBlockStyle(val);

            return (
              <div
                key={blockIdx}
                title={`Block ${blockIdx}${val ? ': File ' + val : ' (Free)'}`}
                style={{ backgroundColor: style.bg }}
                className={`h-[42px] rounded-[4px] flex items-center justify-center font-bold text-[13px] transition hover:scale-105 cursor-pointer ${style.text}`}
              >
                {isUsed ? val : blockIdx}
              </div>
            );
          })}
        </div>
      </div>

      {/* Method Explanation Line */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-[6px] text-[13px] text-slate-700 leading-relaxed">
        <strong className="font-bold text-[#1e293b]">{method}:</strong>{' '}
        {explanations[method]}
      </div>
    </div>
  );
}

