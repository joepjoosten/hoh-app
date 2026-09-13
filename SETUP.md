# Setup Complete!

Your Harmonie van Horst app has been scaffolded successfully using **Effect v4** and **Supabase**.

## What's Been Created

### Project Structure

```
hoh-app/
├── apps/
│   ├── mobile/          # Expo React Native app (iOS & Android)
│   │   ├── app/         # File-based routing with Expo Router
│   │   │   ├── (auth)/  # Authentication screens
│   │   │   └── (tabs)/  # Main app tabs
│   │   └── lib/         # Mobile-specific utilities
│   └── web/             # Next.js admin panel
│       ├── src/
│       │   ├── app/     # App Router pages
│       │   │   └── admin/  # Admin dashboard
│       │   └── lib/     # Web-specific utilities
├── packages/
│   └── shared/          # Shared Effect services and schemas
│       ├── src/
│       │   ├── schema/  # Effect Schema definitions
│       │   └── services/  # Effect services (Auth, Rehearsals, etc.)
└── supabase/
    ├── config.toml      # Supabase local dev config
    └── migrations/      # Database migrations
```

### Technologies Used

- **Effect v4** - Type-safe functional programming with Effect Schema
- **Supabase** - PostgreSQL database, authentication, real-time
- **Expo** - React Native for iOS/Android
- **Next.js** - React framework for web admin
- **pnpm** - Fast, disk-efficient package manager

## Next Steps

### 1. Set Up Supabase Locally

```bash
# Start Supabase local development
supabase start

# This will output your local credentials:
# - API URL: http://127.0.0.1:54321
# - anon key: [your-local-key]
# - service_role key: [your-service-role-key]
```

### 2. Update Environment Variables

Copy your Supabase local credentials to:

```bash
# Already created from .env.example
nano .env
nano apps/mobile/.env
nano apps/web/.env.local
```

### 3. Apply Database Migrations

```bash
# Apply the initial schema migration
supabase db push

# Verify tables were created
supabase db diff
```

### 4. Configure OAuth Providers

For Google and Apple Sign-In to work, you need to:

#### **Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add to Supabase: `supabase/config.toml` (already configured)
6. Set environment variables:
   - `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID`
   - `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET`

#### **Apple OAuth:**
1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a Services ID
3. Configure Sign in with Apple
4. Add to Supabase config
5. Set environment variables:
   - `SUPABASE_AUTH_EXTERNAL_APPLE_CLIENT_ID`
   - `SUPABASE_AUTH_EXTERNAL_APPLE_SECRET`

### 5. Run the Apps

#### **Mobile App:**

```bash
# Start Expo dev server
pnpm dev:mobile

# Then in another terminal:
# For iOS (requires Mac + Xcode)
cd apps/mobile && pnpm ios

# For Android (requires Android Studio)
cd apps/mobile && pnpm android
```

#### **Web Admin:**

```bash
pnpm dev:web
# Open http://localhost:3000
```

## Effect v4 Usage

All schemas and services use Effect v4 patterns:

### **Schema Definition:**

```typescript
import { Schema as S } from "effect"

const User = S.Struct({
  id: S.String,
  email: S.String,
  full_name: S.NullOr(S.String)
})
```

### **Service Usage:**

```typescript
import { Effect } from "effect"
import { RehearsalService } from "@hoh/shared"

// In a component or Effect program:
const program = Effect.gen(function* () {
  const rehearsalService = yield* RehearsalService
  const rehearsals = yield* rehearsalService.list()
  return rehearsals
})

// Run the program
const result = await AppRuntime.runPromise(program)
```

### **Context Services:**

Services are defined using Effect v4's `Context.Service`:

```typescript
class MyService extends Context.Service<MyService, {
  readonly doSomething: () => Effect.Effect<string>
}>()("MyService") {}
```

## Database Schema

The initial migration includes:

- **users** - User profiles (extends Supabase auth.users)
- **formations** - Orchestra groups (Muziekmaatjes, Orkest, etc.)
- **positions** - Instrument positions
- **user_positions** - User membership in formations
- **user_roles** - Roles (admin, board, member, student)
- **rehearsals** - Rehearsal schedule
- **rehearsal_absences** - Absence tracking
- **events** - Calendar events
- **sheet_music** - Sheet music library

## Useful Commands

```bash
# Install dependencies
pnpm install

# Type check shared package
pnpm --filter @hoh/shared type-check

# Start Supabase
supabase start

# Stop Supabase
supabase stop

# Reset database (WARNING: deletes data)
supabase db reset

# Create new migration
supabase migration new my_migration_name

# Generate TypeScript types from database
supabase gen types typescript --local > packages/shared/src/types/supabase.ts
```

## Development Workflow

1. Make database changes in `supabase/migrations/`
2. Update Effect schemas in `packages/shared/src/schema/`
3. Create/update services in `packages/shared/src/services/`
4. Use services in mobile (`apps/mobile/`) and web (`apps/web/`)
5. Type check with `pnpm --filter @hoh/shared type-check`

## Deployment

### **Mobile:**
- iOS: Build with Xcode, upload to App Store Connect
- Android: Build APK/AAB, upload to Google Play Console

### **Web:**
- Deploy to Vercel (recommended)
- Or any Node.js hosting (Netlify, Railway, etc.)

### **Database:**
- Use Supabase Cloud (https://supabase.com)
- Or self-host PostgreSQL with PostgREST

## Need Help?

- Effect docs: https://effect.website
- Effect v4 migration: See `/Users/joepjoosten/development/github/effect/MIGRATION.md`
- Supabase docs: https://supabase.com/docs
- Expo docs: https://docs.expo.dev
- Next.js docs: https://nextjs.org/docs

Good luck with your orchestra app! 🎵
