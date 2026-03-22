"use client";

import { useRouter } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { deleteEvent, type Event } from "@/lib/actions/events";
import { Calendar, MapPin } from "lucide-react";

export function EventList({ events }: { events: Event[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    await deleteEvent(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Events</h2>
          <p className="text-sm text-gray-500">
            {events.length} events total
          </p>
        </div>
        <EventForm />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Event
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Date
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Location
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Type
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
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-50 last:border-0"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-400 truncate max-w-xs">
                    {event.description}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={13} />
                    <span className="text-xs">{event.date}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={13} />
                    <span className="text-xs">{event.location}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                    {event.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      event.is_upcoming ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <EventForm event={event} />
                    <DeleteConfirm
                      title={event.title}
                      onConfirm={() => handleDelete(event.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No events yet. Add your first event.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
