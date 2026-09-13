import { Schema as S } from "effect"
import { UUID, DateTimeString } from "./common"

// Sheet Music schema
export const SheetMusic = S.Struct({
  id: UUID,
  title: S.String,
  composer: S.NullOr(S.String),
  formation_id: S.NullOr(UUID),
  file_url: S.String,
  thumbnail_url: S.NullOr(S.String),
  uploaded_by: S.NullOr(UUID),
  created_at: DateTimeString,
  updated_at: DateTimeString
})

export const SheetMusicInsert = S.Struct({
  id: S.optional(UUID),
  title: S.String,
  composer: S.optional(S.NullOr(S.String)),
  formation_id: S.optional(S.NullOr(UUID)),
  file_url: S.String,
  thumbnail_url: S.optional(S.NullOr(S.String)),
  uploaded_by: UUID,
  created_at: S.optional(DateTimeString),
  updated_at: S.optional(DateTimeString)
})

export const SheetMusicUpdate = S.Struct({
  title: S.optional(S.String),
  composer: S.optional(S.NullOr(S.String)),
  formation_id: S.optional(S.NullOr(UUID)),
  file_url: S.optional(S.String),
  thumbnail_url: S.optional(S.NullOr(S.String)),
  updated_at: S.optional(DateTimeString)
})

// Type inference
export type SheetMusic = S.Schema.Type<typeof SheetMusic>
export type SheetMusicInsert = S.Schema.Type<typeof SheetMusicInsert>
export type SheetMusicUpdate = S.Schema.Type<typeof SheetMusicUpdate>
