import { Schema as S } from "effect"
import { UUID, Email, DateTimeString, UserRole } from "./common"

// User schema
export const User = S.Struct({
  id: UUID,
  email: Email,
  full_name: S.NullOr(S.String),
  avatar_url: S.NullOr(S.String),
  phone: S.NullOr(S.String),
  created_at: DateTimeString,
  updated_at: DateTimeString
})

export const UserInsert = S.Struct({
  id: UUID,
  email: Email,
  full_name: S.optional(S.NullOr(S.String)),
  avatar_url: S.optional(S.NullOr(S.String)),
  phone: S.optional(S.NullOr(S.String)),
  created_at: S.optional(DateTimeString),
  updated_at: S.optional(DateTimeString)
})

export const UserUpdate = S.Struct({
  id: S.optional(UUID),
  email: S.optional(Email),
  full_name: S.optional(S.NullOr(S.String)),
  avatar_url: S.optional(S.NullOr(S.String)),
  phone: S.optional(S.NullOr(S.String)),
  created_at: S.optional(DateTimeString),
  updated_at: S.optional(DateTimeString)
})

// User Role schema
export const UserRoleRow = S.Struct({
  id: UUID,
  user_id: UUID,
  role: UserRole,
  created_at: DateTimeString
})

// Type inference
export type User = S.Schema.Type<typeof User>
export type UserInsert = S.Schema.Type<typeof UserInsert>
export type UserUpdate = S.Schema.Type<typeof UserUpdate>
export type UserRoleRow = S.Schema.Type<typeof UserRoleRow>
