import { Context, Effect, Layer } from "effect"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

export class SupabaseService extends Context.Service<SupabaseService, {
  readonly client: SupabaseClient<any>
}>()("SupabaseService") {}

export const makeSupabaseService = (url: string, anonKey: string) =>
  Layer.succeed(
    SupabaseService,
    {
      client: createClient(url, anonKey)
    }
  )
