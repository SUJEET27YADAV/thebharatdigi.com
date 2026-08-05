import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "@/utils/env";

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

export const createServerClient = () =>
  createClient(supabaseUrl, supabaseKey);
