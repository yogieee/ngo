"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type Member = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  notes: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getMembers(role?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (role && role !== "all") {
    query = query.eq("role", role);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Member[];
}

export async function createMember(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("members").insert({
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    role: formData.get("role") as string,
    notes: (formData.get("notes") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/members");
  return { success: true };
}

export async function updateMember(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("members")
    .update({
      name: formData.get("name") as string,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      role: formData.get("role") as string,
      notes: (formData.get("notes") as string) || null,
      image_url: (formData.get("image_url") as string) || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/members");
  return { success: true };
}

export async function deleteMember(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/members");
  return { success: true };
}
