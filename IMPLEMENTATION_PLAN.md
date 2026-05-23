# Academy Engel Execution Board

This file is the implementation backlog for the project.  
Use it as the single source of truth for what is done, what is blocked, and what comes next.

## Status Legend

- `TODO`: not started
- `IN PROGRESS`: currently being worked on
- `DONE`: finished
- `BLOCKED`: cannot continue until a dependency is resolved

## Priority Legend

- `P0`: critical, blocks core progress
- `P1`: important, needed for MVP
- `P2`: useful but not blocking

## Project Goal

Build Academy Engel as a full-stack Next.js app with:

- bilingual public website (`en`, `de`)
- PostgreSQL + Prisma
- admin CMS with `ADMIN` and `EDITOR`
- lead capture for contact and placement requests

Out of scope for phase 1:

- student portal
- payments
- enrollment system
- LMS features

## Current Snapshot

### Already Done

- `DONE | P1` Public App Router structure created
- `DONE | P1` Locale routes added under `/{locale}`
- `DONE | P1` Homepage rebuilt in Next.js from `index.html`
- `DONE | P1` Local marketing images downloaded into `public/images`
- `DONE | P1` Reusable public UI components created
- `DONE | P1` FAQ accordion interaction added
- `DONE | P1` Tailwind moved to local setup
- `DONE | P1` `.gitignore` added
- `DONE | P1` Initial Prisma schema draft added
- `DONE | P1` `.env.example` added
- `DONE | P1` Frontend build passes

### Current Blockers

- `DONE | P0` Full dependency install for Prisma/Auth stack completed in this environment
- `DONE | P0` Real PostgreSQL connection is configured in `.env.local`
- `TODO | P0` Auth is not wired
- `TODO | P0` CMS does not exist yet
- `TODO | P0` Public pages still use mock data instead of database reads

## Next Recommended Step

- `TODO | P0` Add Prisma and server foundation helpers

This is the next task because it unlocks:

- database migrations
- seeding
- auth
- lead persistence
- CMS CRUD

## Execution Backlog

### Phase 1: Environment and Runtime

- `DONE | P0` Run clean dependency install
- `DONE | P0` Confirm `next-auth` is installed
- `DONE | P0` Confirm `prisma` is installed
- `DONE | P0` Confirm `@prisma/client` is installed
- `DONE | P0` Confirm `bcryptjs` is installed
- `DONE | P0` Confirm `zod` is installed
- `DONE | P1` Resolve `@next/swc` version mismatch warning
- `DONE | P0` Create `.env.local` from `.env.example`
- `DONE | P0` Set real `DATABASE_URL`
- `DONE | P0` Set `NEXTAUTH_SECRET`
- `DONE | P0` Set `NEXTAUTH_URL`

### Phase 2: Database Setup

- `DONE | P0` Create local PostgreSQL database
- `DONE | P0` Run `prisma generate`
- `DONE | P0` Create first migration
- `DONE | P0` Run `prisma migrate dev`
- `DONE | P0` Verify schema applies cleanly

### Phase 3: Prisma and Server Foundation

- `TODO | P1` Add Prisma singleton client helper
- `TODO | P1` Add auth config files
- `TODO | P1` Add password hashing helpers
- `TODO | P1` Add role guard helpers
- `TODO | P1` Add shared `zod` validation schemas
- `TODO | P1` Add localized content mapping helpers

### Phase 4: Seed and Initial Data

- `TODO | P1` Replace placeholder `prisma/seed.mjs`
- `TODO | P1` Seed admin user
- `TODO | P1` Seed editor user
- `TODO | P1` Seed courses
- `TODO | P1` Seed teachers
- `TODO | P1` Seed blog posts
- `TODO | P1` Seed FAQ items
- `TODO | P1` Seed site settings
- `TODO | P1` Seed initial homepage content consistent with current design

### Phase 5: Public Data Integration

- `TODO | P0` Replace mock homepage data with Prisma reads
- `TODO | P0` Replace mock courses data with Prisma reads
- `TODO | P0` Replace mock teachers data with Prisma reads
- `TODO | P0` Replace mock blog data with Prisma reads
- `TODO | P0` Replace mock FAQ data with Prisma reads
- `TODO | P1` Load site settings from database
- `TODO | P1` Keep locale rendering stable for both `en` and `de`
- `TODO | P1` Verify metadata generation per locale/page

### Phase 6: Lead Forms

- `TODO | P0` Save contact form submissions into `Lead`
- `TODO | P0` Save placement form submissions into `Lead`
- `TODO | P1` Validate forms with `zod`
- `TODO | P1` Store `locale` for each lead
- `TODO | P1` Store correct `LeadType`
- `TODO | P1` Add success state UI
- `TODO | P1` Add error state UI

### Phase 7: Authentication

- `TODO | P0` Configure Auth.js / NextAuth for App Router
- `TODO | P0` Add credentials login
- `TODO | P0` Add login page for admin
- `TODO | P0` Add session handling
- `TODO | P1` Add logout flow
- `TODO | P0` Restrict admin routes to authenticated users

### Phase 8: Authorization

- `TODO | P0` Define `ADMIN` permissions
- `TODO | P0` Define `EDITOR` permissions
- `TODO | P0` Restrict user management to `ADMIN`
- `TODO | P0` Allow content management for `ADMIN` and `EDITOR`
- `TODO | P0` Protect server actions against unauthorized use

### Phase 9: Admin CMS Shell

- `TODO | P1` Create `/admin` layout
- `TODO | P1` Create admin navigation/sidebar
- `TODO | P1` Create dashboard page
- `TODO | P1` Add reusable admin table layout
- `TODO | P1` Add reusable admin form layout
- `TODO | P1` Add loading states
- `TODO | P1` Add empty states

### Phase 10: CMS Content Modules

- `TODO | P1` Courses list page in admin
- `TODO | P1` Courses create/edit form
- `TODO | P1` Teachers list page in admin
- `TODO | P1` Teachers create/edit form
- `TODO | P1` Posts list page in admin
- `TODO | P1` Posts create/edit form
- `TODO | P1` FAQ list page in admin
- `TODO | P1` FAQ create/edit form
- `TODO | P1` Site settings editor
- `TODO | P1` Leads list page
- `TODO | P1` Lead detail/update page
- `TODO | P1` Users list page
- `TODO | P1` Users create/edit page

### Phase 11: CRUD Actions

- `TODO | P0` Add server actions for courses
- `TODO | P0` Add server actions for teachers
- `TODO | P0` Add server actions for blog posts
- `TODO | P0` Add server actions for FAQ items
- `TODO | P0` Add server actions for site settings
- `TODO | P0` Add server actions for leads
- `TODO | P0` Add server actions for users
- `TODO | P1` Add cache revalidation after writes

### Phase 12: UI and Content Cleanup

- `TODO | P1` Compare homepage visually against `index.html`
- `TODO | P1` Tighten spacing and typography where needed
- `TODO | P1` Improve mobile menu behavior if needed
- `TODO | P1` Standardize button/link styles
- `TODO | P1` Remove any remaining text encoding problems
- `TODO | P1` Normalize English and German copy
- `TODO | P2` Split oversized files if maintainability drops
- `TODO | P2` Remove obsolete prototype code after DB migration is done

## Testing Checklist

### Build and Runtime

- `DONE | P1` `npm run build` passes for current frontend
- `DONE | P0` Prisma client generates successfully
- `DONE | P0` Prisma migrations work on clean DB
- `TODO | P1` Seed script runs successfully

### Public Website

- `DONE | P1` `/en` works
- `DONE | P1` `/de` works
- `DONE | P1` courses pages render
- `DONE | P1` blog pages render
- `DONE | P1` teachers page renders
- `DONE | P1` FAQ page renders
- `DONE | P1` contact page renders
- `DONE | P1` placement page renders
- `DONE | P1` local images load
- `TODO | P1` all public pages read from database

### Auth and Admin

- `TODO | P0` admin can sign in
- `TODO | P0` editor can sign in
- `TODO | P0` anonymous user is blocked from admin
- `TODO | P0` admin can manage users
- `TODO | P0` editor cannot manage users
- `TODO | P0` admin and editor can manage content

### Leads

- `TODO | P0` contact form creates `Lead`
- `TODO | P0` placement form creates `Lead`
- `TODO | P1` lead locale is stored correctly
- `TODO | P1` lead status can be updated in admin

## Suggested Working Order

1. Finish install and runtime setup
2. Connect PostgreSQL and Prisma
3. Add seed data
4. Replace mock content with DB content
5. Connect lead forms
6. Add auth
7. Build admin shell
8. Add CRUD actions and role restrictions
9. Final cleanup and QA

## Notes

- `lib/site-data.js` is currently a temporary mock content source.
- The public website is ahead of the backend right now.
- Local project `.npmrc` now forces the official npm registry to avoid the broken user-level mirror.
- Local PostgreSQL is running in Docker on `localhost:5433` for this workspace.
- Prisma schema is now applied and ready for Phase 3 foundation work.
