"use client";

import { useRouter } from "next/navigation";
import { ActivityForm } from "@/components/admin/ActivityForm";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { deleteActivity, type Activity } from "@/lib/actions/activities";
import { iconMap } from "@/lib/icon-map";

export function ActivityList({ activities }: { activities: Activity[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    await deleteActivity(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Activities</h2>
          <p className="text-sm text-gray-500">
            {activities.length} activities total
          </p>
        </div>
        <ActivityForm />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Activity
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Type
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Order
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Status
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              const Icon = iconMap[activity.icon_name] || iconMap.Heart;
              return (
                <tr
                  key={activity.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Icon size={16} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate max-w-xs">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs capitalize">
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {activity.sort_order}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        activity.is_active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <ActivityForm activity={activity} />
                      <DeleteConfirm
                        title={activity.title}
                        onConfirm={() => handleDelete(activity.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
            {activities.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No activities yet. Add your first activity.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
