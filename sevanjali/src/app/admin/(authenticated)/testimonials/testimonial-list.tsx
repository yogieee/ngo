"use client";

import { useRouter } from "next/navigation";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import {
  deleteTestimonial,
  toggleTestimonialVisibility,
  type Testimonial,
} from "@/lib/actions/testimonials";
import { Eye, EyeOff } from "lucide-react";

export function TestimonialList({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const router = useRouter();

  async function handleDelete(id: string) {
    await deleteTestimonial(id);
    router.refresh();
  }

  async function handleToggleVisibility(id: string, currentlyVisible: boolean) {
    await toggleTestimonialVisibility(id, !currentlyVisible);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
          <p className="text-sm text-gray-500">
            {testimonials.length} testimonials total &middot;{" "}
            {testimonials.filter((t) => t.is_visible).length} visible
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Student
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Course
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">
                Testimonial
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
            {testimonials.map((testimonial) => (
              <tr
                key={testimonial.id}
                className="border-b border-gray-50 last:border-0"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-sm font-semibold text-orange-600">
                      {testimonial.name[0]}
                    </div>
                    <p className="font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                    {testimonial.course}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="text-gray-500 truncate max-w-sm">
                    {testimonial.quote}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                      testimonial.is_visible
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        testimonial.is_visible ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {testimonial.is_visible ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleVisibility(
                          testimonial.id,
                          testimonial.is_visible
                        )
                      }
                      className={`p-1.5 rounded transition-colors ${
                        testimonial.is_visible
                          ? "text-gray-400 hover:text-orange-500 hover:bg-orange-50"
                          : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                      }`}
                      title={
                        testimonial.is_visible
                          ? "Hide from homepage"
                          : "Show on homepage"
                      }
                    >
                      {testimonial.is_visible ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                    <DeleteConfirm
                      title={`testimonial by ${testimonial.name}`}
                      onConfirm={() => handleDelete(testimonial.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No testimonials yet. Students can submit them from the
                  homepage.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
