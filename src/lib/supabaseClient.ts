"use client";
import { createClient } from "@supabase/supabase-js";

export const createBrowserSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.warn("Supabase env vars are not set.");
  }
  return createClient(url || "", anonKey || "");
};

