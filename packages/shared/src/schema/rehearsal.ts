import { Schema as S } from "effect"
import { UUID, DateTimeString } from "./common"

// Rehearsal schema
export const Rehearsal = S.Struct({
  id: UUID,
  formation_id: UUID,
  title: S.String,
  description: S.NullOr(S.String),
  rehearsal_date: DateTimeString,
  location: S.NullOr(S.String),
  notes: S.NullOr(S.String),
  created_by: S.NullOr(UUID),
  created_at: DateTimeString,
  updated_at: DateTimeString
})

export const RehearsalInsert = S.Struct({
  id: S.optional(UUID),
  formation_id: UUID,
  title: S.String,
  description: S.optional(S.NullOr(S.String)),
  rehearsal_date: DateTimeString,
  location: S.optional(S.NullOr(S.String)),
  notes: S.optional(S.NullOr(S.String)),
  created_by: UUID,
  created_at: S.optional(DateTimeString),
  updated_at: S.optional(DateTimeString)
})

export const RehearsalUpdate = S.Struct({
  formation_id: S.optional(UUID),
  title: S.optional(S.String),
  description: S.optional(S.NullOr(S.String)),
  rehearsal_date: S.optional(DateTimeString),
  location: S.optional(S.NullOr(S.String)),
  notes: S.optional(S.NullOr(S.String)),
  updated_at: S.optional(DateTimeString)
})

// Rehearsal Absence schema
export const RehearsalAbsence = S.Struct({
  id: UUID,
  rehearsal_id: UUID,
  user_id: UUID,
  reason: S.NullOr(S.String),
  created_at: DateTimeString
})

export const RehearsalAbsenceInsert = S.Struct({
  id: S.optional(UUID),
  rehearsal_id: UUID,
  user_id: UUID,
  reason: S.optional(S.NullOr(S.String)),
  created_at: S.optional(DateTimeString)
})

// Type inference
export type Rehearsal = S.Schema.Type<typeof Rehearsal>
export type RehearsalInsert = S.Schema.Type<typeof RehearsalInsert>
export type RehearsalUpdate = S.Schema.Type<typeof RehearsalUpdate>
export type RehearsalAbsence = S.Schema.Type<typeof RehearsalAbsence>
export type RehearsalAbsenceInsert = S.Schema.Type<typeof RehearsalAbsenceInsert>
