"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Calendar, Users, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

const navItems = [
  { label: "Activities", href: "/admin/activities", icon: LayoutGrid },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Members", href: "/admin/members", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col min-h-screen shrink-0">
      <div className="p-5 border-b border-gray-100">
        <Link href="/admin" className="block">
          <h2 className="text-lg font-bold text-gray-900">Sevanjali</h2>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
