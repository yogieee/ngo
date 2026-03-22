"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X, Pencil } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import {
  createEvent,
  updateEvent,
  type Event,
} from "@/lib/actions/events";
import { useRouter } from "next/navigation";

interface EventFormProps {
  event?: Event;
}

const eventTypes = ["Healthcare", "Education", "Community", "Cultural", "Other"];

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(event?.image_url || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditing = !!event;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);

    const result = isEditing
      ? await updateEvent(event.id, formData)
      : await createEvent(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setOpen(false);
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {isEditing ? (
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            <Plus size={16} />
            Add Event
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-full max-w-xl z-50 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditing ? "Edit Event" : "Add Event"}
            </Dialog.Title>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 mt-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  name="title"
                  required
                  defaultValue={event?.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date (text) *
                  </label>
                  <input
                    name="date"
                    required
                    defaultValue={event?.date}
                    placeholder="e.g. 1st & 3rd Sunday"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exact Date (optional)
                  </label>
                  <input
                    name="event_date"
                    type="date"
                    defaultValue={event?.event_date || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    name="location"
                    required
                    defaultValue={event?.location}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    name="type"
                    required
                    defaultValue={event?.type || "Healthcare"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={event?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <ImageUpload value={imageUrl} onChange={setImageUrl} />
              </div>

              <div className="flex items-center gap-2">
                <input type="hidden" name="is_upcoming" value="false" />
                <input
                  type="checkbox"
                  id="is_upcoming"
                  defaultChecked={event?.is_upcoming ?? true}
                  onChange={(e) => {
                    const hidden = e.target.previousElementSibling as HTMLInputElement;
                    hidden.value = e.target.checked ? "true" : "false";
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_upcoming" className="text-sm text-gray-700">
                  Upcoming (visible on homepage & events page)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
