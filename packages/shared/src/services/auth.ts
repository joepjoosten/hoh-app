import { Effect, Context, Layer } from "effect"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { SupabaseService } from "./supabase"

export class AuthService extends Context.Service<AuthService, {
  readonly signInWithGoogle: () => Effect.Effect<{ url: string }, AuthError>
  readonly signInWithApple: () => Effect.Effect<{ url: string }, AuthError>
  readonly signOut: () => Effect.Effect<void, AuthError>
  readonly getSession: () => Effect.Effect<Session | null, AuthError>
  readonly getUser: () => Effect.Effect<User | null, AuthError>
  readonly onAuthStateChange: (
    callback: (event: string, session: Session | null) => void
  ) => Effect.Effect<() => void, never>
}>()("AuthService") {}

export const makeAuthService = Effect.gen(function* () {
  const supabase = yield* SupabaseService

  return {
    signInWithGoogle: () =>
      Effect.tryPromise({
        try: async () => {
          const { data, error } = await supabase.client.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: typeof window !== "undefined" ? window?.location.origin : undefined
            }
          })
          if (error) throw error
          return { url: data.url }
        },
        catch: (error) => error as AuthError
      }),

    signInWithApple: () =>
      Effect.tryPromise({
        try: async () => {
          const { data, error } = await supabase.client.auth.signInWithOAuth({
            provider: "apple",
            options: {
              redirectTo: typeof window !== "undefined" ? window?.location.origin : undefined
            }
          })
          if (error) throw error
          return { url: data.url }
        },
        catch: (error) => error as AuthError
      }),

    signOut: () =>
      Effect.tryPromise({
        try: async () => {
          const { error } = await supabase.client.auth.signOut()
          if (error) throw error
        },
        catch: (error) => error as AuthError
      }),

    getSession: () =>
      Effect.tryPromise({
        try: async () => {
          const { data, error } = await supabase.client.auth.getSession()
          if (error) throw error
          return data.session
        },
        catch: (error) => error as AuthError
      }),

    getUser: () =>
      Effect.tryPromise({
        try: async () => {
          const { data, error } = await supabase.client.auth.getUser()
          if (error) throw error
          return data.user
        },
        catch: (error) => error as AuthError
      }),

    onAuthStateChange: (callback: (event: string, session: Session | null) => void) =>
      Effect.sync(() => {
        const { data } = supabase.client.auth.onAuthStateChange(callback)
        return data.subscription.unsubscribe
      })
  }
}).pipe(Layer.effect(AuthService))
