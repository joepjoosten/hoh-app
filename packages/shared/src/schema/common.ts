import { Schema as S } from "effect"

// Common schemas
export const UUID = S.String.pipe(S.check(S.isPattern(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)))
export const Email = S.String.pipe(S.check(S.isPattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)))
export const DateTimeString = S.String.pipe(S.check(S.isPattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)))

// Enums
export const EventType = S.Literals(["rehearsal", "concert", "meeting", "social", "board"])
export const UserRole = S.Literals(["admin", "board", "member", "student"])
export const InstrumentFamily = S.Literals(["Hout", "Koper", "Slagwerk"])
