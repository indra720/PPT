import React from 'react';

// Demo 7: Disk Space Utilization Analyzer with proportional visual bars
export default function DiskAnalyzerDemo() {
  const totalDriveSize = 120; // 120 GB total drive

  const folderUsage = [
    { name: 'Videos', size: 42 },
    { name: 'Games', size: 28 },
    { name: 'Pictures', size: 14 },
    { name: 'Documents', size: 9 },
    { name: 'Downloads', size: 7 },
  ];

  // Maximum size for scaling bar width
  const maxSize = Math.max(...folderUsage.map((f) => f.size));

  // Calculate used and free space in code
  const totalUsed = folderUsage.reduce((acc, curr) => acc + curr.size, 0);
  const totalFree = totalDriveSize - totalUsed;

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        7. Disk Space Analyzer
      </h3>
      <p className="text-[12px] text-[#64748b] mb-4">
        Shows which folders use the most space on a 120 GB drive.
      </p>

      {/* Folder storage consumption rows */}
      <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white shadow-sm space-y-3 mb-4">
        {folderUsage.map((folder, idx) => {
          const widthPercent = (folder.size / maxSize) * 100;
          const drivePercent = Math.round((folder.size / totalDriveSize) * 100);
          const barColor = folder.size > 25 ? '#f59e0b' : '#0d9488';

          return (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-[13px]">
              {/* Folder Name */}
              <div className="w-28 flex items-center gap-1.5 font-medium text-slate-800">
                <span>📁</span>
                <span>{folder.name}</span>
              </div>

              {/* Graphical Bar */}
              <div className="flex-1 bg-slate-100 h-[16px] rounded-[4px] overflow-hidden">
                <div
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: barColor,
                  }}
                  className="h-full rounded-[4px] transition-all duration-300"
                />
              </div>

              {/* Size and Percentage */}
              <div className="w-24 text-right text-slate-600 font-mono text-[12px]">
                {folder.size} GB ({drivePercent}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary line */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-[6px] text-[13px] text-slate-700 flex items-center justify-between">
        <span>
          Used: <strong className="font-bold text-[#1e293b]">{totalUsed} GB</strong> of {totalDriveSize} GB
        </span>
        <span className="text-[#0d9488] font-bold">
          Free: {totalFree} GB
        </span>
      </div>
    </div>
  );
}

