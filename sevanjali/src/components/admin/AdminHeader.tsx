"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/activities": "Activities",
  "/admin/events": "Events",
  "/admin/members": "Members",
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Admin";

  return (
    <header className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between shrink-0">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        View Site &rarr;
      </a>
    </header>
  );
}
