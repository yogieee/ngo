"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X, Pencil } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { iconOptions, iconMap } from "@/lib/icon-map";
import {
  createActivity,
  updateActivity,
  type Activity,
} from "@/lib/actions/activities";
import { useRouter } from "next/navigation";

interface ActivityFormProps {
  activity?: Activity;
}

const activityTypes = ["healthcare", "education", "community"];

export function ActivityForm({ activity }: ActivityFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(activity?.image_url || "");
  const [stats, setStats] = useState<{ label: string; value: string }[]>(
    activity?.stats || []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditing = !!activity;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);
    formData.set("stats", JSON.stringify(stats));

    const result = isEditing
      ? await updateActivity(activity.id, formData)
      : await createActivity(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setOpen(false);
      setLoading(false);
      router.refresh();
    }
  }

  function addStat() {
    setStats([...stats, { label: "", value: "" }]);
  }

  function removeStat(index: number) {
    setStats(stats.filter((_, i) => i !== index));
  }

  function updateStat(index: number, field: "label" | "value", val: string) {
    const updated = [...stats];
    updated[index][field] = val;
    setStats(updated);
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
            Add Activity
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-full max-w-xl z-50 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditing ? "Edit Activity" : "Add Activity"}
            </Dialog.Title>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 mt-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    name="title"
                    required
                    defaultValue={activity?.title}
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
                    defaultValue={activity?.type || "healthcare"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {activityTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    name="icon_name"
                    defaultValue={activity?.icon_name || "Heart"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {iconOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort Order
                  </label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={activity?.sort_order || 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  defaultValue={activity?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Brief description for activity cards"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detail Description
                </label>
                <textarea
                  name="detail_description"
                  rows={4}
                  defaultValue={activity?.detail_description || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Full description for the Learn More page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <ImageUpload value={imageUrl} onChange={setImageUrl} />
              </div>

              {/* Stats */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Stats
                  </label>
                  <button
                    type="button"
                    onClick={addStat}
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                  >
                    + Add Stat
                  </button>
                </div>
                <div className="space-y-2">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        value={stat.label}
                        onChange={(e) => updateStat(i, "label", e.target.value)}
                        placeholder="Label"
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <input
                        value={stat.value}
                        onChange={(e) => updateStat(i, "value", e.target.value)}
                        placeholder="Value"
                        className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeStat(i)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="hidden"
                  name="is_active"
                  value="false"
                />
                <input
                  type="checkbox"
                  id="is_active"
                  defaultChecked={activity?.is_active ?? true}
                  onChange={(e) => {
                    const hidden = e.target.previousElementSibling as HTMLInputElement;
                    hidden.value = e.target.checked ? "true" : "false";
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  Active (visible on public site)
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
                  {loading
                    ? "Saving..."
                    : isEditing
                    ? "Update"
                    : "Create"}
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
