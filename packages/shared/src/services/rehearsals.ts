import { Effect, Context, Layer } from "effect"
import { SupabaseService } from "./supabase"
import type { Rehearsal, RehearsalInsert, RehearsalAbsenceInsert } from "../schema"

export class RehearsalService extends Context.Service<RehearsalService, {
  readonly list: (formationId?: string) => Effect.Effect<Rehearsal[], Error>
  readonly getById: (id: string) => Effect.Effect<Rehearsal | null, Error>
  readonly create: (rehearsal: RehearsalInsert) => Effect.Effect<Rehearsal, Error>
  readonly update: (id: string, updates: Partial<Rehearsal>) => Effect.Effect<Rehearsal, Error>
  readonly markAbsent: (absence: RehearsalAbsenceInsert) => Effect.Effect<void, Error>
}>()("RehearsalService") {}

export const makeRehearsalService = Effect.gen(function* () {
  const supabase = yield* SupabaseService

  return {
    list: (formationId?: string) =>
      Effect.tryPromise({
        try: async () => {
          let query = supabase.client
            .from("rehearsals")
            .select("*")
            .order("rehearsal_date", { ascending: true })

          if (formationId) {
            query = query.eq("formation_id", formationId)
          }

          const { data, error } = await query
          if (error) throw error
          return data || []
        },
        catch: (error) => new Error(String(error))
      }),

    getById: (id: string) =>
      Effect.tryPromise({
        try: async () => {
          const { data, error } = await supabase.client
            .from("rehearsals")
            .select("*")
            .eq("id", id)
            .single()
          if (error) throw error
          return data
        },
        catch: (error) => new Error(String(error))
      }),

    create: (rehearsal: RehearsalInsert) =>
      Effect.tryPromise({
        try: async () => {
          const { data, error} = await supabase.client
            .from("rehearsals")
            .insert(rehearsal as any)
            .select()
            .single()
          if (error) throw error
          return data as Rehearsal
        },
        catch: (error) => new Error(String(error))
      }),

    update: (id: string, updates: Partial<Rehearsal>) =>
      Effect.tryPromise({
        try: async () => {
          const { data, error } = await supabase.client
            .from("rehearsals")
            .update(updates as any)
            .eq("id", id)
            .select()
            .single()
          if (error) throw error
          return data as Rehearsal
        },
        catch: (error) => new Error(String(error))
      }),

    markAbsent: (absence: RehearsalAbsenceInsert) =>
      Effect.tryPromise({
        try: async () => {
          const { error } = await supabase.client
            .from("rehearsal_absences")
            .insert(absence as any)
          if (error) throw error
        },
        catch: (error) => new Error(String(error))
      })
  }
}).pipe(Layer.effect(RehearsalService))
