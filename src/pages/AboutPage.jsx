import React from 'react';

// AboutPage: shows project details, OS concepts, learning outcomes, and team members
export default function AboutPage() {
  const teamMembers = ['Indrajeet', 'Hemant Jangid', 'Aditya Tiwari', 'Nishu'];

  return (
    <main className="max-w-[1100px] mx-auto p-[14px] w-full max-w-full min-w-0">
      <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 sm:p-6 max-w-2xl mx-auto shadow-sm min-w-0 max-w-full overflow-hidden">
        <h2 className="text-[18px] font-bold text-[#0d9488] mb-4 border-b border-slate-100 pb-2">
          About File System Explorer
        </h2>

        <div className="space-y-3 text-[14px] text-[#1e293b]">
          <div className="flex flex-col sm:flex-row sm:items-center py-1 border-b border-slate-50">
            <span className="font-semibold text-slate-500 w-44">Project Name:</span>
            <span className="font-medium text-[#1e293b]">File System Explorer</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-1 border-b border-slate-50">
            <span className="font-semibold text-slate-500 w-44">Subject:</span>
            <span>Operating Systems</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-1 border-b border-slate-50">
            <span className="font-semibold text-slate-500 w-44">OS Concept:</span>
            <span>File System (Inodes, Tree Hierarchy, and Disk Block Allocation)</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-1 border-b border-slate-50">
            <span className="font-semibold text-slate-500 w-44">Learning Outcome:</span>
            <span className="text-[#0d9488] font-medium">Learn file handling</span>
          </div>

          <div className="pt-2">
            <span className="font-semibold text-slate-500 block mb-2">Team Members:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {teamMembers.map((member, index) => (
                <li
                  key={index}
                  className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-[6px] flex items-center gap-2 text-slate-700"
                >
                  <span className="text-[#0d9488] font-bold">#{index + 1}</span>
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

