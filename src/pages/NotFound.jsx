import React from 'react';
import { Link } from 'react-router-dom';

// NotFound page: shown when a route does not match any registered path
export default function NotFound() {
  return (
    <main className="max-w-[1100px] mx-auto p-[14px] w-full max-w-full min-w-0">
      <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-8 text-center max-w-md mx-auto my-12 shadow-sm min-w-0 max-w-full overflow-hidden">
        <h2 className="text-4xl font-extrabold text-[#0d9488] mb-2">404</h2>
        <p className="text-[16px] font-semibold text-[#1e293b] mb-1">Page Not Found</p>
        <p className="text-[13px] text-[#64748b] mb-6">
          The requested page path does not exist in this file system explorer.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#0d9488] text-white text-[13px] font-medium px-4 py-2 rounded-[6px] hover:opacity-90 transition"
        >
          Go back to Explorer
        </Link>
      </div>
    </main>
  );
}

