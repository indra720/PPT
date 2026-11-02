import React from 'react';
import { NavLink } from 'react-router-dom';

// Header component: permanently FIXED at the top of the viewport on all screen sizes
export default function Header() {
  // Helper to apply active styling with a teal underline
  const getNavLinkClass = ({ isActive }) =>
    `pb-1 font-medium transition-colors whitespace-nowrap ${
      isActive
        ? 'text-white border-b-2 border-[#0d9488]'
        : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e293b] text-white px-4 sm:px-6 py-2.5 sm:py-3 shadow-md border-b border-slate-700/50 w-full">
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4 min-w-0">
        {/* Title and Subtitle */}
        <div className="min-w-0">
          <h1 className="text-[18px] sm:text-[20px] font-bold leading-tight">
            File System Explorer
          </h1>
          <p className="text-[12px] sm:text-[13px] text-[#cbd5e1] mt-0.5 leading-snug">
            OS project: a simulated file system with tree, inodes and disk blocks (64 blocks, 1 block = 20 characters)
          </p>
        </div>

        {/* Navigation links: stacks neatly on mobile/tablet and sits right-aligned on desktop */}
        <nav className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[13px] sm:text-[14px] shrink-0 pt-0.5 lg:pt-0">
          <NavLink to="/" className={getNavLinkClass}>
            Explorer
          </NavLink>
          <NavLink to="/topics" className={getNavLinkClass}>
            Topic Demos
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
          <NavLink to="/terms" className={getNavLinkClass}>
            Key Terms
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
