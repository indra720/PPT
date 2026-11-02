import React from 'react';
import { getPath } from '../utils/fsHelpers';

// Inode card: shows metadata / File Control Block of the selected file or folder as formatted JSON
export default function InodeCard({ nodes, selectedId }) {
  const selectedNode = nodes[selectedId];

  // If somehow nothing is selected, show fallback
  if (!selectedNode) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-3">
        <h2 className="text-[15px] font-bold text-[#0d9488] mb-2">
          4. Inode / File Control Block
        </h2>
        <div className="bg-[#1e293b] text-[#5eead4] font-mono text-[12px] p-[10px] rounded-[6px]">
          No item selected.
        </div>
      </div>
    );
  }

  // Calculate size display
  let sizeDisplay = '0 chars';
  if (selectedNode.type === 'file') {
    const charCount = (selectedNode.content || '').length;
    sizeDisplay = `${charCount} chars`;
  } else {
    const itemCount = Array.isArray(selectedNode.childIds) ? selectedNode.childIds.length : 0;
    sizeDisplay = `${itemCount} items`;
  }

  // Parent name display
  let parentDisplay = 'none (root)';
  if (selectedNode.parentId !== null && nodes[selectedNode.parentId]) {
    parentDisplay = nodes[selectedNode.parentId].name;
  }

  // Construct Inode object for display
  const inodeData = {
    id: selectedNode.id,
    name: selectedNode.name,
    type: selectedNode.type === 'file' ? 'FILE' : 'DIRECTORY',
    path: getPath(nodes, selectedNode.id),
    size: sizeDisplay,
    blocks: selectedNode.type === 'file' ? selectedNode.blocks : 'n/a',
    created: selectedNode.created,
    modified: selectedNode.modified,
    parent: parentDisplay,
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-3 flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
      <div>
        {/* Card Title */}
        <h2 className="text-[15px] font-bold text-[#0d9488] mb-1">
          4. Inode / File Control Block
        </h2>

        {/* Small subtitle */}
        <p className="text-[13px] text-[#64748b] mb-2">
          Metadata stored by the OS for the selected inode.
        </p>

        {/* Dark JSON viewer box */}
        <div className="bg-[#1e293b] text-[#5eead4] font-mono text-[12px] p-[10px] rounded-[6px] max-h-[200px] overflow-y-auto">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {JSON.stringify(inodeData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Description line */}
      <div className="mt-2.5 pt-2 border-t border-slate-100">
        <p className="text-[12px] text-[#64748b]">
          An inode holds all file attributes except file data itself.
        </p>
      </div>
    </div>
  );
}

