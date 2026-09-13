import { Schema as S } from "effect"
import { UUID, DateTimeString, EventType } from "./common"

// Event schema
export const Event = S.Struct({
  id: UUID,
  title: S.String,
  description: S.NullOr(S.String),
  event_date: DateTimeString,
  event_type: EventType,
  formation_id: S.NullOr(UUID),
  location: S.NullOr(S.String),
  created_by: S.NullOr(UUID),
  created_at: DateTimeString,
  updated_at: DateTimeString
})

export const EventInsert = S.Struct({
  id: S.optional(UUID),
  title: S.String,
  description: S.optional(S.NullOr(S.String)),
  event_date: DateTimeString,
  event_type: EventType,
  formation_id: S.optional(S.NullOr(UUID)),
  location: S.optional(S.NullOr(S.String)),
  created_by: UUID,
  created_at: S.optional(DateTimeString),
  updated_at: S.optional(DateTimeString)
})

export const EventUpdate = S.Struct({
  title: S.optional(S.String),
  description: S.optional(S.NullOr(S.String)),
  event_date: S.optional(DateTimeString),
  event_type: S.optional(EventType),
  formation_id: S.optional(S.NullOr(UUID)),
  location: S.optional(S.NullOr(S.String)),
  updated_at: S.optional(DateTimeString)
})

// Type inference
export type Event = S.Schema.Type<typeof Event>
export type EventInsert = S.Schema.Type<typeof EventInsert>
export type EventUpdate = S.Schema.Type<typeof EventUpdate>
