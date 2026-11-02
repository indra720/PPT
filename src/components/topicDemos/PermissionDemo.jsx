import React, { useState } from 'react';

// Demo 6: Linux chmod Permission Matrix Simulator
export default function PermissionDemo() {
  // Permissions array: [read (4), write (2), execute (1)]
  const [permissions, setPermissions] = useState({
    owner: [1, 1, 1],
    group: [1, 0, 1],
    others: [1, 0, 0],
  });

  // Toggles an individual bit
  const handleToggle = (role, index) => {
    setPermissions((prev) => {
      const updatedRow = [...prev[role]];
      updatedRow[index] = updatedRow[index] === 1 ? 0 : 1;
      return { ...prev, [role]: updatedRow };
    });
  };

  // Calculates octal digit for a role (e.g., [1,1,1] => 4 + 2 + 1 = 7)
  const calculateOctal = (arr) => arr[0] * 4 + arr[1] * 2 + arr[2] * 1;

  // Formats string representation (e.g., rwx, r-x)
  const formatSymbolic = (arr) =>
    (arr[0] ? 'r' : '-') + (arr[1] ? 'w' : '-') + (arr[2] ? 'x' : '-');

  const ownerOctal = calculateOctal(permissions.owner);
  const groupOctal = calculateOctal(permissions.group);
  const othersOctal = calculateOctal(permissions.others);
  const octalString = `${ownerOctal}${groupOctal}${othersOctal}`;

  const symbolicString = `-${formatSymbolic(permissions.owner)}${formatSymbolic(
    permissions.group
  )}${formatSymbolic(permissions.others)}`;

  return (
    <div>
      {/* Title & Description */}
      <h3 className="text-[16px] font-bold text-[#0d9488] mb-0.5">
        6. File Permission Manager
      </h3>
      <p className="text-[12px] text-[#64748b] mb-4">
        Read (r), write (w) and execute (x) rights for owner, group and others, like Linux chmod.
      </p>

      {/* Permission Table with horizontal scroll container for mobile */}
      <div className="border border-[#e2e8f0] rounded-[8px] overflow-x-auto bg-white shadow-sm mb-4">
        <table className="w-full min-w-[420px] text-left text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
            <tr>
              <th className="py-2.5 px-3 font-semibold whitespace-nowrap">User Role</th>
              <th className="py-2.5 px-3 font-semibold text-center whitespace-nowrap">Read (r = 4)</th>
              <th className="py-2.5 px-3 font-semibold text-center whitespace-nowrap">Write (w = 2)</th>
              <th className="py-2.5 px-3 font-semibold text-center whitespace-nowrap">Execute (x = 1)</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">Octal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {['owner', 'group', 'others'].map((role) => {
              const octalVal = calculateOctal(permissions[role]);
              return (
                <tr key={role} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-medium text-slate-800 capitalize whitespace-nowrap">
                    {role}
                  </td>
                  {[0, 1, 2].map((idx) => (
                    <td key={idx} className="py-2.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={permissions[role][idx] === 1}
                        onChange={() => handleToggle(role, idx)}
                        className="w-4 h-4 accent-[#0d9488] cursor-pointer"
                      />
                    </td>
                  ))}
                  <td className="py-2.5 px-3 text-right font-bold text-[#0d9488] font-mono whitespace-nowrap">
                    {octalVal}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Terminal View with overflow scroll */}
      <div className="bg-[#1e293b] text-[#5eead4] font-mono text-[12px] p-3 rounded-[6px] shadow-sm space-y-1 overflow-x-auto">
        <p className="text-slate-400">$ ls -l notes.txt</p>
        <p className="text-white whitespace-nowrap">
          {symbolicString} 1 user group 1024 Nov 2 12:00 notes.txt
        </p>
        <p className="text-slate-400 mt-2">$ chmod {octalString} notes.txt</p>
        <p className="text-[#5eead4] whitespace-nowrap">
          Permissions updated to {octalString} ({symbolicString})
        </p>
      </div>
    </div>
  );
}
