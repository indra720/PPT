import React, { useState, useEffect } from 'react';
import TreeCard from '../components/TreeCard';
import EditorCard from '../components/EditorCard';
import DiskCard from '../components/DiskCard';
import InodeCard from '../components/InodeCard';
import {
  getInitialData,
  getPath,
  getAllDescendantIds,
} from '../utils/fsHelpers';

// ExplorerPage: manages all file system state (nodes, disk, selection) and actions
export default function ExplorerPage() {
  const defaultData = getInitialData();

  // Helper to load state from localStorage or fallback to default
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem('fse');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.nodes && parsed.disk) {
          return {
            nodes: parsed.nodes,
            disk: parsed.disk,
            nextId: parsed.nextId ?? 4,
            selectedId: parsed.selectedId ?? 0,
            loadedFromStorage: true,
          };
        }
      }
    } catch (err) {
      console.error('Failed to load file system from localStorage:', err);
    }
    return {
      nodes: defaultData.nodes,
      disk: defaultData.disk,
      nextId: defaultData.nextId,
      selectedId: defaultData.selectedId,
      loadedFromStorage: false,
    };
  };

  const initialLoaded = loadSavedState();

  // React state variables
  const [nodes, setNodes] = useState(initialLoaded.nodes);
  const [disk, setDisk] = useState(initialLoaded.disk);
  const [nextId, setNextId] = useState(initialLoaded.nextId);
  const [selectedId, setSelectedId] = useState(initialLoaded.selectedId);
  const [statusMessage, setStatusMessage] = useState(
    initialLoaded.loadedFromStorage ? 'Loaded saved data.' : 'File system ready.'
  );

  // Save state to localStorage whenever nodes, disk, nextId, or selectedId change
  useEffect(() => {
    try {
      const dataToSave = { nodes, disk, nextId, selectedId };
      localStorage.setItem('fse', JSON.stringify(dataToSave));
    } catch (err) {
      console.error('Failed to save file system to localStorage:', err);
    }
  }, [nodes, disk, nextId, selectedId]);

  // First-fit allocation: finds N free block indices in a disk array
  const allocateFirstFit = (targetDisk, countNeeded) => {
    const allocatedIndices = [];
    for (let i = 0; i < targetDisk.length; i++) {
      if (targetDisk[i] === null) {
        allocatedIndices.push(i);
        if (allocatedIndices.length === countNeeded) {
          return allocatedIndices;
        }
      }
    }
    return null; // Not enough free space
  };

  // Validates file or folder name
  const validateName = (name, parentId) => {
    if (!name || name.trim() === '') {
      return 'Error: name cannot be empty.';
    }
    if (name.includes('/') || name.includes('\\')) {
      return 'Error: name cannot contain / or \\';
    }
    const parentNode = nodes[parentId];
    if (parentNode && Array.isArray(parentNode.childIds)) {
      const isDuplicate = parentNode.childIds.some(
        (childId) => nodes[childId]?.name.toLowerCase() === name.trim().toLowerCase()
      );
      if (isDuplicate) {
        return 'Error: name already exists here.';
      }
    }
    return null;
  };

  // Create a new folder
  const handleAddFolder = () => {
    const currentNode = nodes[selectedId];
    const parentId = currentNode && currentNode.type === 'dir' ? currentNode.id : currentNode?.parentId ?? 0;

    const inputName = window.prompt('Enter folder name:');
    if (inputName === null) return; // User clicked Cancel

    const trimmedName = inputName.trim();
    const error = validateName(trimmedName, parentId);
    if (error) {
      setStatusMessage(error);
      return;
    }

    const now = new Date().toLocaleString();
    const newFolderId = nextId;

    const newFolder = {
      id: newFolderId,
      name: trimmedName,
      type: 'dir',
      parentId: parentId,
      content: '',
      blocks: [],
      childIds: [],
      created: now,
      modified: now,
    };

    // Update parent's childIds
    const updatedParent = {
      ...nodes[parentId],
      childIds: [...nodes[parentId].childIds, newFolderId],
      modified: now,
    };

    setNodes((prev) => ({
      ...prev,
      [parentId]: updatedParent,
      [newFolderId]: newFolder,
    }));
    setNextId((prev) => prev + 1);
    setSelectedId(newFolderId);

    const fullPath = getPath({ ...nodes, [parentId]: updatedParent, [newFolderId]: newFolder }, newFolderId);
    setStatusMessage(`Created ${fullPath}`);
  };

  // Create a new file (allocates 1 disk block immediately)
  const handleAddFile = () => {
    const currentNode = nodes[selectedId];
    const parentId = currentNode && currentNode.type === 'dir' ? currentNode.id : currentNode?.parentId ?? 0;

    const inputName = window.prompt('Enter file name:');
    if (inputName === null) return; // User clicked Cancel

    const trimmedName = inputName.trim();
    const error = validateName(trimmedName, parentId);
    if (error) {
      setStatusMessage(error);
      return;
    }

    // A new file gets 1 block right away (20 chars limit initially empty)
    const freeBlocks = allocateFirstFit(disk, 1);
    if (!freeBlocks) {
      setStatusMessage('Error: disk full!');
      return;
    }

    const assignedBlock = freeBlocks[0];
    const now = new Date().toLocaleString();
    const newFileId = nextId;

    const newFile = {
      id: newFileId,
      name: trimmedName,
      type: 'file',
      parentId: parentId,
      content: '',
      blocks: [assignedBlock],
      childIds: [],
      created: now,
      modified: now,
    };

    // Update disk array
    const newDisk = [...disk];
    newDisk[assignedBlock] = newFileId;

    // Update parent's childIds
    const updatedParent = {
      ...nodes[parentId],
      childIds: [...nodes[parentId].childIds, newFileId],
      modified: now,
    };

    setDisk(newDisk);
    setNodes((prev) => ({
      ...prev,
      [parentId]: updatedParent,
      [newFileId]: newFile,
    }));
    setNextId((prev) => prev + 1);
    setSelectedId(newFileId);

    const fullPath = getPath({ ...nodes, [parentId]: updatedParent, [newFileId]: newFile }, newFileId);
    setStatusMessage(`Created ${fullPath}`);
  };

  // Save (write) content into selected file with reallocation of disk blocks
  const handleSaveContent = (newContent) => {
    const selectedNode = nodes[selectedId];
    if (!selectedNode || selectedNode.type !== 'file') return;

    // 1 block = 20 characters
    const blocksNeeded = Math.max(1, Math.ceil(newContent.length / 20));

    // Create a temporary disk where old blocks of this file are marked free (null)
    const tempDisk = [...disk];
    for (let i = 0; i < selectedNode.blocks.length; i++) {
      const blk = selectedNode.blocks[i];
      tempDisk[blk] = null;
    }

    // Try allocating blocksNeeded from the tempDisk using first-fit
    const allocated = allocateFirstFit(tempDisk, blocksNeeded);
    if (!allocated) {
      setStatusMessage('Error: disk full! Not enough free blocks.');
      return;
    }

    // Place fileId into newly allocated blocks
    for (let i = 0; i < allocated.length; i++) {
      tempDisk[allocated[i]] = selectedNode.id;
    }

    const now = new Date().toLocaleString();
    const updatedNode = {
      ...selectedNode,
      content: newContent,
      blocks: allocated,
      modified: now,
    };

    setDisk(tempDisk);
    setNodes((prev) => ({
      ...prev,
      [selectedNode.id]: updatedNode,
    }));

    const path = getPath(nodes, selectedNode.id);
    setStatusMessage(`Saved ${path} (${newContent.length} chars, ${blocksNeeded} block(s))`);
  };

  // Rename selected file or folder
  const handleRename = () => {
    const selectedNode = nodes[selectedId];
    if (!selectedNode) return;

    if (selectedNode.id === 0) {
      setStatusMessage('Error: root directory cannot be renamed.');
      return;
    }

    const inputName = window.prompt('Enter new name:', selectedNode.name);
    if (inputName === null) return;

    const trimmedName = inputName.trim();
    if (trimmedName === selectedNode.name) return; // No change

    const parentNode = nodes[selectedNode.parentId];
    if (parentNode && Array.isArray(parentNode.childIds)) {
      const isDuplicate = parentNode.childIds.some(
        (childId) =>
          childId !== selectedNode.id &&
          nodes[childId]?.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (isDuplicate) {
        setStatusMessage('Error: name already exists here.');
        return;
      }
    }

    if (trimmedName === '' || trimmedName.includes('/') || trimmedName.includes('\\')) {
      setStatusMessage('Error: invalid name.');
      return;
    }

    const now = new Date().toLocaleString();
    setNodes((prev) => ({
      ...prev,
      [selectedNode.id]: {
        ...prev[selectedNode.id],
        name: trimmedName,
        modified: now,
      },
    }));

    setStatusMessage(`Renamed to ${trimmedName}`);
  };

  // Delete selected file or folder (frees blocks and removes nodes recursively)
  const handleDelete = () => {
    const selectedNode = nodes[selectedId];
    if (!selectedNode) return;

    if (selectedNode.id === 0) {
      setStatusMessage('Error: root directory cannot be deleted.');
      return;
    }

    // If folder has children, ask confirmation first
    if (selectedNode.type === 'dir' && selectedNode.childIds.length > 0) {
      const confirmed = window.confirm(
        'Folder is not empty. Delete anyway and remove all contents?'
      );
      if (!confirmed) return;
    }

    // Collect all nodes to remove (the node itself + all descendants)
    const descendantIds = getAllDescendantIds(nodes, selectedNode.id);
    const allIdsToDelete = [selectedNode.id, ...descendantIds];

    // Collect all blocks to free from all deleted files
    const blocksToFree = [];
    allIdsToDelete.forEach((id) => {
      const item = nodes[id];
      if (item && item.type === 'file' && Array.isArray(item.blocks)) {
        blocksToFree.push(...item.blocks);
      }
    });

    // Free the blocks on disk
    const newDisk = [...disk];
    blocksToFree.forEach((blk) => {
      newDisk[blk] = null;
    });

    // Update parent's childIds
    const parentId = selectedNode.parentId;
    const updatedParent = {
      ...nodes[parentId],
      childIds: nodes[parentId].childIds.filter((cid) => cid !== selectedNode.id),
      modified: new Date().toLocaleString(),
    };

    // Remove nodes
    const newNodes = { ...nodes, [parentId]: updatedParent };
    allIdsToDelete.forEach((id) => {
      delete newNodes[id];
    });

    setDisk(newDisk);
    setNodes(newNodes);
    setSelectedId(parentId); // Select parent after deletion
    setStatusMessage(`Deleted ${selectedNode.name} (blocks freed)`);
  };

  // Reset file system to sample data
  const handleReset = () => {
    const fresh = getInitialData();
    setNodes(fresh.nodes);
    setDisk(fresh.disk);
    setNextId(fresh.nextId);
    setSelectedId(fresh.selectedId);
    setStatusMessage('Reset to sample file system.');
  };

  return (
    <main className="max-w-[1100px] mx-auto p-[14px] w-full max-w-full min-w-0">
      {/* 2x2 grid of cards, becomes 1 column under 760px */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] w-full min-w-0">
        {/* Card 1: Directory Tree */}
        <TreeCard
          nodes={nodes}
          selectedId={selectedId}
          onSelectNode={(id) => setSelectedId(id)}
          onAddFolder={handleAddFolder}
          onAddFile={handleAddFile}
          onRename={handleRename}
          onDelete={handleDelete}
          onReset={handleReset}
          statusMessage={statusMessage}
        />

        {/* Card 2: File Editor */}
        <EditorCard
          key={selectedId}
          nodes={nodes}
          selectedId={selectedId}
          onSaveContent={handleSaveContent}
        />

        {/* Card 3: Disk Blocks */}
        <DiskCard
          disk={disk}
          nodes={nodes}
        />

        {/* Card 4: Inode / File Control Block */}
        <InodeCard
          nodes={nodes}
          selectedId={selectedId}
        />
      </div>
    </main>
  );
}
