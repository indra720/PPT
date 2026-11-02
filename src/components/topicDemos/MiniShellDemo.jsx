import React, { useState } from 'react';

// Demo 8: Interactive CLI Shell for File System Commands
export default function MiniShellDemo() {
  const [history, setHistory] = useState([
    'Welcome to Mini FS Shell. Type "help" or run: mkdir, touch, ls, cd, rm, pwd, clear',
  ]);
  const [currentPath, setCurrentPath] = useState('/');
  const [folders, setFolders] = useState({
    '/': ['docs/', 'photos/', 'notes.txt'],
    '/docs/': ['assignment.pdf'],
    '/photos/': ['vacation.jpg'],
  });
  const [commandInput, setCommandInput] = useState('');

  // Runs on pressing Enter in the terminal input
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    const trimmed = commandInput.trim();
    if (!trimmed) return;

    const promptLine = `user@fs:${currentPath}$ ${trimmed}`;
    const newHistory = [...history, promptLine];
    const parts = trimmed.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    if (cmd === 'clear') {
      setHistory([]);
      setCommandInput('');
      return;
    }

    if (cmd === 'pwd') {
      newHistory.push(currentPath);
    } else if (cmd === 'ls') {
      const items = folders[currentPath] || [];
      newHistory.push(items.length > 0 ? items.join('  ') : '(empty)');
    } else if (cmd === 'mkdir') {
      if (!arg) {
        newHistory.push('mkdir: missing operand');
      } else {
        const folderName = arg.endsWith('/') ? arg : `${arg}/`;
        const currentItems = folders[currentPath] || [];
        if (currentItems.includes(folderName)) {
          newHistory.push(`mkdir: cannot create directory '${arg}': File exists`);
        } else {
          const newPath = `${currentPath}${folderName}`;
          setFolders((prev) => ({
            ...prev,
            [currentPath]: [...currentItems, folderName],
            [newPath]: [],
          }));
          newHistory.push(`created directory: ${folderName}`);
        }
      }
    } else if (cmd === 'touch') {
      if (!arg) {
        newHistory.push('touch: missing file operand');
      } else {
        const currentItems = folders[currentPath] || [];
        if (!currentItems.includes(arg)) {
          setFolders((prev) => ({
            ...prev,
            [currentPath]: [...currentItems, arg],
          }));
        }
        newHistory.push(`touched: ${arg}`);
      }
    } else if (cmd === 'cd') {
      if (!arg || arg === '/') {
        setCurrentPath('/');
      } else if (arg === '..') {
        if (currentPath === '/') {
          // already root
        } else {
          // Remove last segment (e.g. /docs/ -> /)
          const segments = currentPath.split('/').filter(Boolean);
          segments.pop();
          const parentPath = segments.length === 0 ? '/' : `/${segments.join('/')}/`;
          setCurrentPath(parentPath);
        }
      } else {
        const target = arg.endsWith('/') ? arg : `${arg}/`;
        const currentItems = folders[currentPath] || [];
        if (currentItems.includes(target)) {
          setCurrentPath(`${currentPath}${target}`);
        } else {
          newHistory.push(`cd: no such folder: ${arg}`);
        }
      }
    } else if (cmd === 'rm') {
      if (!arg) {
        newHistory.push('rm: missing operand');
      } else {
        const currentItems = folders[currentPath] || [];
        const isFolder = currentItems.includes(`${arg}/`);
        const isFile = currentItems.includes(arg);

        if (!isFolder && !isFile) {
          newHistory.push(`rm: not found: ${arg}`);
        } else {
          const itemToRemove = isFolder ? `${arg}/` : arg;
          setFolders((prev) => ({
            ...prev,
            [currentPath]: prev[currentPath].filter((x) => x !== itemToRemove),
          }));
          newHistory.push(`removed: ${itemToRemove}`);
        }
      }
    } else if (cmd === 'help') {
      newHistory.push('Available commands: ls, cd <dir>, cd .., mkdir <dir>, touch <file>, rm <name>, pwd, clear');
    } else {
      newHistory.push(`${cmd}: command not found`);
    }

    setHistory(newHistory);
    setCommandInput('');
  };

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        8. Mini File System (shell)
      </h3>
      <p className="text-[12px] text-[#64748b] mb-3">
        Type: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">mkdir name</code>,{' '}
        <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">touch name</code>,{' '}
        <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">ls</code>,{' '}
        <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">cd name</code>,{' '}
        <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">cd ..</code>,{' '}
        <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">rm name</code>,{' '}
        <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">pwd</code>
      </p>

      {/* Terminal Screen */}
      <div className="bg-[#1e293b] text-[#5eead4] font-mono text-[12px] p-3 rounded-t-[6px] min-h-[200px] max-h-[300px] overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
        {history.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      {/* Terminal Input Row */}
      <div className="flex items-center bg-[#0f172a] text-[#5eead4] font-mono text-[12px] px-3 py-2 rounded-b-[6px] border-t border-slate-700">
        <span className="text-slate-400 mr-2 select-none">
          user@fs:{currentPath}$
        </span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command and press Enter"
          className="flex-1 bg-transparent text-[#5eead4] outline-none placeholder:text-slate-500"
          autoFocus
        />
      </div>
    </div>
  );
}

