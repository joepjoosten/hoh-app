import { Schema as S } from "effect"
import { UUID, DateTimeString, InstrumentFamily } from "./common"

// Position schema
export const Position = S.Struct({
  id: UUID,
  name: S.String,
  instrument_family: S.NullOr(InstrumentFamily),
  created_at: DateTimeString
})

export const PositionInsert = S.Struct({
  id: S.optional(UUID),
  name: S.String,
  instrument_family: S.optional(S.NullOr(InstrumentFamily)),
  created_at: S.optional(DateTimeString)
})

// User Position (junction table)
export const UserPosition = S.Struct({
  id: UUID,
  user_id: UUID,
  position_id: UUID,
  formation_id: UUID,
  created_at: DateTimeString
})

export const UserPositionInsert = S.Struct({
  id: S.optional(UUID),
  user_id: UUID,
  position_id: UUID,
  formation_id: UUID,
  created_at: S.optional(DateTimeString)
})

// Type inference
export type Position = S.Schema.Type<typeof Position>
export type PositionInsert = S.Schema.Type<typeof PositionInsert>
export type UserPosition = S.Schema.Type<typeof UserPosition>
export type UserPositionInsert = S.Schema.Type<typeof UserPositionInsert>
