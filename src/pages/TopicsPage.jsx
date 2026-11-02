import React, { useState } from "react";
import ExplorerDemo from "../components/topicDemos/ExplorerDemo";
import OrganizerDemo from "../components/topicDemos/OrganizerDemo";
import RecycleBinDemo from "../components/topicDemos/RecycleBinDemo";
import DuplicateDemo from "../components/topicDemos/DuplicateDemo";
import AllocationDemo from "../components/topicDemos/AllocationDemo";
import PermissionDemo from "../components/topicDemos/PermissionDemo";
import DiskAnalyzerDemo from "../components/topicDemos/DiskAnalyzerDemo";
import MiniShellDemo from "../components/topicDemos/MiniShellDemo";

// TopicsPage: showcases mini interactive demos matching full container width like ExplorerPage
export default function TopicsPage() {
  const [activeTab, setActiveTab] = useState(1);

  // 8 tabs corresponding exactly to the presentation slides & screenshots
  const tabs = [
    { id: 1, label: "1. Explorer" },
    { id: 2, label: "2. Organizer" },
    { id: 3, label: "3. Recycle Bin" },
    { id: 4, label: "4. Duplicates" },
    { id: 5, label: "5. Allocation" },
    { id: 6, label: "6. Permissions" },
    { id: 7, label: "7. Disk Analyzer" },
    { id: 8, label: "8. Mini FS" },
  ];

  return (
    <main className=" max-w-7xl mx-auto p-[14px] w-full min-w-0">
      <div className="w-full min-w-0">
        {/* Page Heading & Note */}
        <h2 className="text-[18px] font-bold text-[#1e293b]">
          File System Topics: Mini Demos
        </h2>
        <p className="text-[12px] text-[#64748b] mt-0.5 mb-3.5">
          These are sample demos of the other topics we studied. Our main
          project is File System Explorer.
        </p>

        {/* Tab Buttons Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-[6px] text-[12px] px-[10px] py-[6px] font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0d9488] text-white shadow-sm"
                  : "bg-white border border-[#e2e8f0] text-[#1e293b] hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Demo Panel: matching full width like ExplorerPage */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-4 sm:p-5 min-h-[350px] shadow-sm w-full min-w-0">
          {activeTab === 1 && <ExplorerDemo />}
          {activeTab === 2 && <OrganizerDemo />}
          {activeTab === 3 && <RecycleBinDemo />}
          {activeTab === 4 && <DuplicateDemo />}
          {activeTab === 5 && <AllocationDemo />}
          {activeTab === 6 && <PermissionDemo />}
          {activeTab === 7 && <DiskAnalyzerDemo />}
          {activeTab === 8 && <MiniShellDemo />}
        </div>
      </div>
    </main>
  );
}
