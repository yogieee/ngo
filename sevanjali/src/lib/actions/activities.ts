"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type Activity = {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string;
  detail_description: string | null;
  icon_name: string;
  image_url: string | null;
  stats: { label: string; value: string }[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getActivities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as Activity[];
}

export async function getActiveActivities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as Activity[];
}

export async function getActivityBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Activity;
}

export async function createActivity(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const statsRaw = formData.get("stats") as string;

  const { error } = await supabase.from("activities").insert({
    title,
    slug: generateSlug(title),
    type: formData.get("type") as string,
    description: formData.get("description") as string,
    detail_description: formData.get("detail_description") as string,
    icon_name: formData.get("icon_name") as string,
    image_url: (formData.get("image_url") as string) || null,
    stats: statsRaw ? JSON.parse(statsRaw) : [],
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    is_active: formData.get("is_active") === "true",
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/activities");
  revalidatePath("/admin/activities");
  return { success: true };
}

export async function updateActivity(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const statsRaw = formData.get("stats") as string;

  const { error } = await supabase
    .from("activities")
    .update({
      title,
      slug: generateSlug(title),
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      detail_description: formData.get("detail_description") as string,
      icon_name: formData.get("icon_name") as string,
      image_url: (formData.get("image_url") as string) || null,
      stats: statsRaw ? JSON.parse(statsRaw) : [],
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      is_active: formData.get("is_active") === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/activities");
  revalidatePath("/admin/activities");
  return { success: true };
}

export async function deleteActivity(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("activities").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/activities");
  revalidatePath("/admin/activities");
  return { success: true };
}
