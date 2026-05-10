<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Emun Shifts

Shift availability platform for Emun security company. Hebrew UI (RTL).

> For coaching/teaching style and how to interact with me, see CLAUDE.md.

## Roles

- **Guard** — submits weekly recurring availability. Per-day, per-shift-type
  (morning/evening/night), with optional per-availability note. Also has
  one general scheduling note for overall preferences.
- **Manager** — views guard availability across the team, manages guard
  accounts, manages buildings.

There is no Senior Manager role. Only `GUARD` and `MANAGER` exist in the schema.

## Core Logic

- Guards belong to multiple buildings equally — no primary building
- Availability is **general and recurring** (per day of week, per shift type),
  not tied to a specific calendar week and not per building
- A guard's availability is unique per (userId, day, shiftType) — they can only
  mark each day-shift slot once
- Manager decides which building a guard works at when assigning a shift
  (assignment feature not built yet — currently the manager only views
  submitted availabilities)
- Manager creates accounts for guards (guards don't self-register)
- Soft-delete pattern: `isActive` flag on User and Building (no hard deletes)

## Notes — two types

Guards can attach two distinct kinds of notes:

1. **General scheduling note** (`GuardWeeklyNote`, one per guard) — overall
   preferences across the whole week. Example: _"I want 5 shifts total, prefer
   2 nights and 3 mornings."_

2. **Availability-specific note** (`note` field on `Availability`) — applies to
   one specific day/shift slot. Example: on Sunday-morning, _"If possible, give
   me a 12-hour shift."_

These are separate concepts. Don't conflate them.

## Data model summary

- `User` — guards and managers, linked to multiple `Building`s, has many
  `Availability` records, has at most one `GuardWeeklyNote`
- `Building` — has name, street, city, soft-deletable, linked to multiple users
- `Availability` — recurring weekly slot: `(day, shiftType, optional note)`,
  unique per user/day/shiftType
- `GuardWeeklyNote` — single general note per guard
- `Session`, `Account`, `Verification` — better-auth tables (don't modify
  manually unless better-auth requires it)
- Enums: `Role` (GUARD, MANAGER), `ShiftType` (MORNING, EVENING, NIGHT),
  `DayOfWeek` (SUNDAY through SATURDAY)

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- better-auth
- shadcn/ui
- React Hook Form
- Zod
- Hebrew UI, RTL layout

## Workflow

- Don't run commands without explaining first
- Tell me the commit name before committing
- Let me approve before committing
- No Co-Authored-By in commits
- Commit unrelated changes separately
- Keep commit messages under 50 characters (including the full prefix like `feat(sidebar):`)
- Use conventional commits format
- When suggesting a commit message, always show the character count
