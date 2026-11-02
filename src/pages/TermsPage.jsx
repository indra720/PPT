import React from 'react';

// TermsPage: displays a table of essential Operating System file system terms, definitions, and examples
export default function TermsPage() {
  const termsList = [
    {
      term: 'File',
      definition: 'A named collection of related data stored on secondary storage.',
      example: 'notes.txt containing text characters',
    },
    {
      term: 'Directory',
      definition: 'A special file container that holds references to other files and subdirectories.',
      example: '/Documents or /Photos',
    },
    {
      term: 'Root directory',
      definition: 'The top-most directory in the file system hierarchy from which all other paths branch.',
      example: '/ (slash)',
    },
    {
      term: 'Path',
      definition: 'A unique string representing the route to locate a file or directory.',
      example: '/Documents/notes.txt',
    },
    {
      term: 'inode',
      definition: 'Index Node (or File Control Block) containing all metadata about a file except its name and content.',
      example: '{ id: 3, size: "17 chars", blocks: [0] }',
    },
    {
      term: 'Disk block',
      definition: 'The smallest fixed-size unit of allocation on physical storage.',
      example: 'Block 0 (holds up to 20 characters in this project)',
    },
    {
      term: 'Metadata',
      definition: 'Data that describes other data, such as file size, creation timestamp, modified timestamp, and permissions.',
      example: 'created: "11/2/2026, 3:30 PM", modified: "11/2/2026, 3:35 PM"',
    },
  ];

  return (
    <main className="max-w-[1100px] mx-auto p-[14px] w-full max-w-full min-w-0">
      <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 shadow-sm min-w-0 max-w-full overflow-hidden">
        <h2 className="text-[18px] font-bold text-[#0d9488] mb-3">
          Key Operating System File System Terms
        </h2>
        <p className="text-[13px] text-[#64748b] mb-4">
          Quick reference table explaining fundamental concepts demonstrated in this project.
        </p>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-[#1e293b]">
                <th className="py-2.5 px-3 font-semibold w-36">Term</th>
                <th className="py-2.5 px-3 font-semibold">Definition</th>
                <th className="py-2.5 px-3 font-semibold w-72">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {termsList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-bold text-[#0d9488] align-top">
                    {item.term}
                  </td>
                  <td className="py-2.5 px-3 text-[#1e293b] align-top">
                    {item.definition}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[12px] text-slate-600 bg-slate-50/50 align-top">
                    {item.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

