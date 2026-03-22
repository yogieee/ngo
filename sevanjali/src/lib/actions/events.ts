"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type Event = {
  id: string;
  title: string;
  date: string;
  event_date: string | null;
  location: string;
  description: string;
  type: string;
  image_url: string | null;
  is_upcoming: boolean;
  created_at: string;
  updated_at: string;
};

export async function getUpcomingEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_upcoming", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Event[];
}

export async function getAllEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Event[];
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").insert({
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    event_date: (formData.get("event_date") as string) || null,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    image_url: (formData.get("image_url") as string) || null,
    is_upcoming: formData.get("is_upcoming") === "true",
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  return { success: true };
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .update({
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      event_date: (formData.get("event_date") as string) || null,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      image_url: (formData.get("image_url") as string) || null,
      is_upcoming: formData.get("is_upcoming") === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  return { success: true };
}
