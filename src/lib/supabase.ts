import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 読み取り用クライアント（anonキー）。
 * 環境変数が未設定の場合はnullを返し、呼び出し側でフォールバックする。
 */
export function getSupabaseReadClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

/**
 * 書き込み用クライアント（service roleキー）。Cronジョブ専用。
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
