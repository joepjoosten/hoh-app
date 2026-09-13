import { Schema as S } from "effect"
import { UUID, DateTimeString } from "./common"

// Formation schema
export const Formation = S.Struct({
  id: UUID,
  name: S.String,
  description: S.NullOr(S.String),
  created_at: DateTimeString
})

export const FormationInsert = S.Struct({
  id: S.optional(UUID),
  name: S.String,
  description: S.optional(S.NullOr(S.String)),
  created_at: S.optional(DateTimeString)
})

export const FormationUpdate = S.Struct({
  id: S.optional(UUID),
  name: S.optional(S.String),
  description: S.optional(S.NullOr(S.String)),
  created_at: S.optional(DateTimeString)
})

// Type inference
export type Formation = S.Schema.Type<typeof Formation>
export type FormationInsert = S.Schema.Type<typeof FormationInsert>
export type FormationUpdate = S.Schema.Type<typeof FormationUpdate>
