# **Emun Shift Management App**

## Introduction

I built this app for the security company I work at - I'm a guard there. The problem: 100+ guards from 20+ buildings send their availability to the manager's WhatsApp every week. I made an organized, headache-free app to make the manager's life easier and save him a lot of time, effort, and energy.

Guards submit when they're available for the next week, then the manager assigns them to shifts at specific buildings. The UI is in Hebrew with a right-to-left layout.

## Tech Stack

### Both frontend and backend

- **[Next.js 16](https://nextjs.org)** - Full-Stack React Framework with CSR and SSR, including server actions
- **[Zod 4](https://zod.dev)** - Data validation and schemas

### Frontend Only

- **[shadcn/ui](https://ui.shadcn.com)** - UI library
- **[TailwindCSS 4](https://tailwindcss.com)** - CSS framework
- **[React-Hook-Form](https://react-hook-form.com)** - Form state management

### Backend & Services

- **[Prisma](https://www.prisma.io)** - Database ORM
- **[PostgreSQL](https://www.postgresql.org)** - Relational database
- **[Better Auth](https://www.better-auth.com)** - Authentication
- **[Resend](https://resend.com)** - Email service

### Development & Deployment

- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[Vercel](https://vercel.com)** - Deployment

## Features

### General

- Hebrew UI with full right-to-left layout
- Username + password authentication via better-auth

### Role-based routing

- Visiting any protected page without a session redirects to `/sign-in`
- Visiting `/` sends guards to `/guard` and managers to `/admin`
- Cross-role access (a guard hitting `/admin` or vice versa) returns a 403 forbidden page

### Guards

- Submit weekly availability across morning, evening, and night shifts
- Add an optional note per day (e.g. "available only after 16:00")

### Managers

- View all availabilities for all guards in one weekly grid
- Assign guards to shifts and pick the building per assignment
- Create guard accounts - guards cannot self-register

## Project Structure

```
app/
  (auth)/         Sign-in and forbidden pages
  admin/          Manager screens — schedule, guards, buildings
  guard/          Guard screens — availability submission
  api/            Route handlers
components/
  layout/         App shell, sidebar, headers
  shared/         Cross-feature components
  ui/             shadcn primitives
lib/
  actions/        Server actions
  validators/     Zod schemas
  auth.ts         better-auth setup
  prisma.ts       Prisma client
prisma/
  schema.prisma   Database schema
  seed.ts         Seed script
proxy.ts          Routing middleware (role-based access)
```
