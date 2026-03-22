"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MemberForm } from "@/components/admin/MemberForm";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { deleteMember, type Member } from "@/lib/actions/members";
import { User } from "lucide-react";

const roleColors: Record<string, string> = {
  volunteer: "bg-blue-50 text-blue-600",
  donor: "bg-green-50 text-green-600",
  member: "bg-gray-100 text-gray-600",
  trustee: "bg-orange-50 text-orange-600",
};

export function MemberList({ members }: { members: Member[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? members : members.filter((m) => m.role === filter);

  async function handleDelete(id: string) {
    await deleteMember(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Members</h2>
          <p className="text-sm text-gray-500">
            {members.length} members total
          </p>
        </div>
        <MemberForm />
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "volunteer", "donor", "member", "trustee"].map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === role
                ? "bg-orange-100 text-orange-700"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Member
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Role
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Contact
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member) => (
              <tr
                key={member.id}
                className="border-b border-gray-50 last:border-0"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={14} className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      {member.notes && (
                        <p className="text-xs text-gray-400 truncate max-w-xs">
                          {member.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs capitalize ${
                      roleColors[member.role] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    {member.email && (
                      <p className="text-xs text-gray-500">{member.email}</p>
                    )}
                    {member.phone && (
                      <p className="text-xs text-gray-500">{member.phone}</p>
                    )}
                    {!member.email && !member.phone && (
                      <p className="text-xs text-gray-300">No contact info</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <MemberForm member={member} />
                    <DeleteConfirm
                      title={member.name}
                      onConfirm={() => handleDelete(member.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  {filter === "all"
                    ? "No members yet. Add your first member."
                    : `No ${filter}s found.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
