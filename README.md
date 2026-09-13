# Harmonie van Horst App

Full-stack application for Harmonie van Horst orchestra, including iOS, Android, and web platforms.

## Stack

- **Mobile**: Expo + React Native (iOS & Android)
- **Web**: Next.js (Admin Panel)
- **Shared**: Effect v4 + Effect Schema for type-safe business logic
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **Monorepo**: pnpm workspaces

## Project Structure

```
.
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── web/             # Next.js admin panel
├── packages/
│   └── shared/          # Shared Effect schemas and services
└── supabase/
    ├── config.toml      # Supabase configuration
    └── migrations/      # Database migrations
```

## Features

- Social authentication (Google, Apple)
- Rehearsal management and absence tracking
- Events calendar (concerts, meetings, board events)
- Sheet music library with PDF support
- Member management with positions and formations
- Push notifications (formation/position-specific)
- Admin panel for content management

## Formations

- Muziekmaatjes
- Opmaatjes
- Jeugdorkest
- Slagwerkgroep
- Orkest

## Prerequisites

- Node.js 18+
- pnpm 8+
- Supabase CLI
- For iOS: Xcode, Apple Developer Account
- For Android: Android Studio

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment variables

Copy the example files and update with your Supabase credentials:

```bash
# Root
cp .env.example .env

# Mobile app
cp apps/mobile/.env.example apps/mobile/.env

# Web app
cp apps/web/.env.local.example apps/web/.env.local
```

Update the following variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### 3. Initialize Supabase

```bash
# Start local Supabase
pnpm supabase:start

# Apply migrations
pnpm db:push
```

### 4. Configure OAuth providers

You need to set up OAuth providers in your Supabase dashboard:

**Google OAuth:**
1. Create a Google Cloud project
2. Configure OAuth consent screen
3. Create OAuth 2.0 credentials
4. Add to Supabase: Authentication > Providers > Google

**Apple OAuth:**
1. Create an Apple Developer Account
2. Create a Services ID
3. Configure Sign in with Apple
4. Add to Supabase: Authentication > Providers > Apple

Update `.env` files with the OAuth credentials.

## Development

### Run mobile app

```bash
# Start Expo dev server
pnpm dev:mobile

# Run on iOS (requires Mac)
cd apps/mobile && pnpm ios

# Run on Android
cd apps/mobile && pnpm android
```

### Run web app

```bash
pnpm dev:web
```

Visit http://localhost:3000 for the admin panel.

### Database management

```bash
# View Supabase status
pnpm supabase:status

# Reset database (WARNING: deletes all data)
pnpm db:reset

# Create a new migration
cd supabase
supabase migration new <migration_name>
```

## Effect Schema Usage

All data types are defined using Effect Schema in `packages/shared/src/schema/`.

Example usage:

```typescript
import { Effect } from "effect"
import { RehearsalService, type Rehearsal } from "@hoh/shared"
import { AppRuntime } from "./lib/effect-runtime"

// Create a program using Effect
const program = Effect.gen(function* () {
  const service = yield* RehearsalService
  const rehearsals = yield* service.list()
  return rehearsals
})

// Run the program
const rehearsals = await AppRuntime.runPromise(program)
```

## Building for Production

### Mobile

```bash
cd apps/mobile

# iOS
npx expo run:ios --configuration Release --device

# Android
npx expo run:android --variant release
```

### Web

```bash
cd apps/web
pnpm build
pnpm start
```

## Deployment

### Web (Vercel)

1. Connect your GitHub repo to Vercel
2. Set root directory to `apps/web`
3. Add environment variables
4. Deploy

### Mobile

- **iOS**: Use Xcode to archive and upload to App Store Connect
- **Android**: Build APK/AAB and upload to Google Play Console

## Database Schema

See `supabase/migrations/20240101000000_initial_schema.sql` for the complete schema.

### Main Tables

- `users` - User profiles
- `formations` - Orchestra formations (Muziekmaatjes, Orkest, etc.)
- `positions` - Instrument positions
- `user_positions` - User membership in formations
- `user_roles` - User roles (admin, board, member, student)
- `rehearsals` - Rehearsal schedule
- `rehearsal_absences` - Absence tracking
- `events` - General calendar events
- `sheet_music` - Sheet music library

## License

Private - Harmonie van Horst
