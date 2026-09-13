import { Layer, ManagedRuntime } from "effect"
import { makeSupabaseService, makeAuthService, makeRehearsalService } from "@hoh/shared"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create the main application layer
const AppLayer = Layer.mergeAll(
  makeSupabaseService(supabaseUrl, supabaseAnonKey)
).pipe(
  Layer.provideMerge(Layer.effectDiscard(makeAuthService)),
  Layer.provideMerge(Layer.effectDiscard(makeRehearsalService))
)

// Create a managed runtime that can be used throughout the app
export const AppRuntime = ManagedRuntime.make(AppLayer)
