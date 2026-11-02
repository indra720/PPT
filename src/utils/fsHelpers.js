// 8 distinct colors for files (fileId % 8)
export const FILE_COLORS = [
  '#0d9488', // teal
  '#f59e0b', // amber
  '#6366f1', // indigo
  '#ec4899', // pink
  '#10b981', // emerald
  '#ef4444', // red
  '#3b82f6', // blue
  '#8b5cf6', // purple
];

// Returns color for a file based on fileId % 8
export function getFileColor(fileId) {
  if (fileId === null || fileId === undefined) return '#e2e8f0';
  return FILE_COLORS[fileId % FILE_COLORS.length];
}

// Builds the full path for any node (e.g., /Documents/notes.txt)
export function getPath(nodes, nodeId) {
  if (!nodes || nodes[nodeId] === undefined) return '';
  if (nodeId === 0) return '/';

  const parts = [];
  let curr = nodes[nodeId];

  while (curr && curr.id !== 0) {
    parts.unshift(curr.name);
    curr = nodes[curr.parentId];
  }

  return '/' + parts.join('/');
}

// Flattens the hierarchical nodes into a single list for rendering in the tree
export function flattenTree(nodes, currentId = 0, depth = 0) {
  const result = [];
  const node = nodes[currentId];
  if (!node) return result;

  // Add current node with depth and full path
  result.push({
    ...node,
    depth,
    path: getPath(nodes, node.id),
  });

  // If it is a directory, recursively add all its children
  if (node.type === 'dir' && Array.isArray(node.childIds)) {
    for (let i = 0; i < node.childIds.length; i++) {
      const childId = node.childIds[i];
      const childItems = flattenTree(nodes, childId, depth + 1);
      for (let j = 0; j < childItems.length; j++) {
        result.push(childItems[j]);
      }
    }
  }

  return result;
}

// Finds all descendant IDs of a node (children, grandchildren, etc.)
export function getAllDescendantIds(nodes, startId) {
  const ids = [];
  const node = nodes[startId];
  if (!node || node.type !== 'dir') return ids;

  for (let i = 0; i < node.childIds.length; i++) {
    const childId = node.childIds[i];
    ids.push(childId);
    const subDescendants = getAllDescendantIds(nodes, childId);
    for (let j = 0; j < subDescendants.length; j++) {
      ids.push(subDescendants[j]);
    }
  }

  return ids;
}

// Returns the initial sample file system data
export function getInitialData() {
  const now = new Date().toLocaleString();

  const initialNodes = {
    0: {
      id: 0,
      name: '/',
      type: 'dir',
      parentId: null,
      content: '',
      blocks: [],
      childIds: [1, 2],
      created: now,
      modified: now,
    },
    1: {
      id: 1,
      name: 'Documents',
      type: 'dir',
      parentId: 0,
      content: '',
      blocks: [],
      childIds: [3],
      created: now,
      modified: now,
    },
    2: {
      id: 2,
      name: 'Photos',
      type: 'dir',
      parentId: 0,
      content: '',
      blocks: [],
      childIds: [],
      created: now,
      modified: now,
    },
    3: {
      id: 3,
      name: 'notes.txt',
      type: 'file',
      parentId: 1,
      content: 'Hello OS project!',
      blocks: [0], // takes block 0 (17 chars <= 20 chars = 1 block)
      childIds: [],
      created: now,
      modified: now,
    },
  };

  // 64 disk blocks (all null except block 0 for notes.txt)
  const initialDisk = new Array(64).fill(null);
  initialDisk[0] = 3;

  return {
    nodes: initialNodes,
    disk: initialDisk,
    nextId: 4,
    selectedId: 3,
  };
}

