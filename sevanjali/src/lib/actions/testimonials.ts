"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  quote: string;
  is_visible: boolean;
  created_at: string;
};

/** Public: fetch visible testimonials */
export async function getVisibleTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Testimonial[];
}

/** Admin: fetch all testimonials */
export async function getAllTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Testimonial[];
}

/** Public: student submits a testimonial */
export async function submitTestimonial(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const course = (formData.get("course") as string)?.trim();
  const quote = (formData.get("quote") as string)?.trim();

  if (!name || !course || !quote) {
    return { error: "All fields are required." };
  }

  if (quote.length > 500) {
    return { error: "Testimonial must be under 500 characters." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    name,
    course,
    quote,
    is_visible: true,
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

/** Admin: toggle visibility */
export async function toggleTestimonialVisibility(id: string, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ is_visible: isVisible })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

/** Admin: delete testimonial */
export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
