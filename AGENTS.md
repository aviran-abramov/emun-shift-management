<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Emun Shifts

Shift availability platform for Emun security company. Hebrew UI (RTL).

## Roles

- **Guard** — submits availability per day (morning/evening/night) with optional note
- **Manager** — views availability, assigns guards to shifts at buildings, creates guard accounts
- **Senior Manager** — same as manager but higher role

## Core Logic

- Guards belong to multiple buildings equally (no primary building)
- Availability is general, not per building
- Manager decides which building when assigning a shift
- Manager creates accounts for guards

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

## Models

- User
- Building
- UserBuilding (many-to-many)
- Availability (userId, date, shiftType, note, weekStart)
- Shift (userId, buildingId, date, shiftType)

## Enums

- ShiftType: MORNING, EVENING, NIGHT
- Role: GUARD, MANAGER, SENIOR_MANAGER

## Workflow

- Don't run commands without explaining first
- Tell me the commit name before committing
- Let me approve before committing
- No Co-Authored-By in commits
- Always push after every commit
- Commit unrelated changes separately
- Keep commit messages under 50 characters (including the full prefix like `feat(sidebar):`)
- Use conventional commits format
- When suggesting a commit message, always show the character count