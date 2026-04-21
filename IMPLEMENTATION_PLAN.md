# Academy Engel Implementation Plan

This document is the working implementation checklist for the `academy engel` project.

## Product Goal

Build Academy Engel as a single full-stack Next.js application with:

- App Router
- PostgreSQL
- Prisma ORM
- bilingual public website (`en`, `de`)
- admin CMS with role-based access
- lead capture for contact and placement requests

Phase 1 does **not** include:

- student accounts
- payment flow
- enrollment automation
- learning portal features

## Current Status

### Completed

- Next.js public site structure created with App Router
- locale-based public routes added under `/{locale}`
- homepage recreated in Next.js based on `index.html`
- local image assets downloaded into `public/images`
- reusable public components added
- FAQ interaction added on the frontend
- Tailwind moved to local project setup
- `.gitignore` added
- initial Prisma schema draft added
- `.env.example` added
- `npm run build` passes on the current frontend structure

### Not Completed Yet

- Prisma runtime installation and database wiring
- actual PostgreSQL connection
- seed script with real initial content
- auth system
- admin CMS
- CRUD actions
- lead persistence
- route protection
- public pages reading from database instead of mock content

## Phase 1: Environment and Infrastructure

### 1. Package and Tooling Setup

- [ ] Run a clean install for all dependencies in `package.json`
- [ ] Confirm `next-auth`, `prisma`, `@prisma/client`, `bcryptjs`, and `zod` are installed correctly
- [ ] Resolve the `@next/swc` version mismatch warning
- [ ] Verify `postcss` and Tailwind setup is stable in dev and build modes

### 2. Environment Variables

- [ ] Create a real `.env.local` from `.env.example`
- [ ] Set `DATABASE_URL` for PostgreSQL
- [ ] Set `NEXTAUTH_SECRET`
- [ ] Set `NEXTAUTH_URL`
- [ ] Document local development env requirements

### 3. Database Bootstrapping

- [ ] Create PostgreSQL database for local development
- [ ] Run `prisma generate`
- [ ] Create first Prisma migration
- [ ] Run `prisma migrate dev`
- [ ] Confirm schema is applied successfully

## Phase 2: Database and Data Layer

### 4. Finalize Prisma Schema

- [ ] Review and refine `User`
- [ ] Review and refine `Course`
- [ ] Review and refine `Teacher`
- [ ] Review and refine `Post`
- [ ] Review and refine `FaqItem`
- [ ] Review and refine `Lead`
- [ ] Review and refine `SiteSetting`
- [ ] Add timestamps and indexes where needed
- [ ] Confirm status enums and role enums are final for phase 1

### 5. Shared Server Utilities

- [ ] Add Prisma client singleton helper
- [ ] Add auth helper utilities
- [ ] Add role guard helpers
- [ ] Add shared form validation schemas with `zod`
- [ ] Add content mapping helpers for `en` and `de`

### 6. Seed Data

- [ ] Replace placeholder seed script in `prisma/seed.mjs`
- [ ] Seed admin user
- [ ] Seed editor user
- [ ] Seed courses
- [ ] Seed teachers
- [ ] Seed blog posts
- [ ] Seed FAQ items
- [ ] Seed site settings
- [ ] Ensure seeded content matches the current homepage direction

## Phase 3: Public Website Integration

### 7. Replace Mock Content with Database Reads

- [ ] Remove dependency on static content in `lib/site-data.js` for production data access
- [ ] Fetch homepage content from Prisma
- [ ] Fetch courses list from Prisma
- [ ] Fetch course detail pages from Prisma
- [ ] Fetch teachers list from Prisma
- [ ] Fetch blog list from Prisma
- [ ] Fetch blog detail pages from Prisma
- [ ] Fetch FAQ content from Prisma
- [ ] Fetch site settings from Prisma

### 8. Public Route Behavior

- [ ] Keep `/{locale}` routing as the public structure
- [ ] Ensure both `en` and `de` render correct localized content
- [ ] Confirm metadata is generated per locale/page
- [ ] Handle not-found states for missing course/blog slugs
- [ ] Add stable navigation behavior between locales

### 9. Public Forms

- [ ] Connect contact form to `Lead` table
- [ ] Connect placement-test form to `Lead` table
- [ ] Validate form submissions with `zod`
- [ ] Store `locale` on lead records
- [ ] Store `type` as `CONTACT` or `PLACEMENT`
- [ ] Add success and failure UI states

## Phase 4: Authentication and Authorization

### 10. Auth Setup

- [ ] Configure Auth.js / NextAuth for App Router
- [ ] Add credentials provider
- [ ] Store password hashes with `bcryptjs`
- [ ] Implement login page for admin area
- [ ] Implement session handling
- [ ] Implement logout flow

### 11. Role-Based Access

- [ ] Define `ADMIN` and `EDITOR` permissions clearly
- [ ] Protect all `/admin` routes
- [ ] Restrict user management to `ADMIN`
- [ ] Allow content management for `ADMIN` and `EDITOR`
- [ ] Prevent unauthorized access to server actions

## Phase 5: Admin CMS

### 12. Admin App Structure

- [ ] Create `/admin` layout
- [ ] Add sidebar/navigation
- [ ] Add dashboard overview page
- [ ] Add shared admin form styles/components
- [ ] Add loading and empty states

### 13. Content Management Screens

- [ ] Courses list/create/edit/publish UI
- [ ] Teachers list/create/edit/publish UI
- [ ] Blog posts list/create/edit/publish UI
- [ ] FAQ list/create/edit UI
- [ ] Site settings editor
- [ ] Leads list/detail/update status UI
- [ ] Users list/create/edit UI

### 14. Admin CRUD Backend

- [ ] Create server actions for courses
- [ ] Create server actions for teachers
- [ ] Create server actions for blog posts
- [ ] Create server actions for FAQ items
- [ ] Create server actions for site settings
- [ ] Create server actions for leads
- [ ] Create server actions for users
- [ ] Add revalidation after mutations

## Phase 6: Quality, UX, and Cleanup

### 15. Frontend Cleanup

- [ ] Compare homepage visually against `index.html`
- [ ] Tighten spacing, typography, and section order where needed
- [ ] Improve mobile navigation behavior
- [ ] Improve button/link consistency
- [ ] Decide whether any remaining animations should stay CSS-only or be expanded

### 16. Content and Encoding Cleanup

- [ ] Ensure no broken encoding remains anywhere in UI or data
- [ ] Normalize copy across English and German content
- [ ] Replace any temporary ASCII-only fallback text if desired
- [ ] Make sure CMS fields support the intended localized content format

### 17. Codebase Cleanup

- [ ] Remove obsolete prototype code
- [ ] Remove unused dependencies if any
- [ ] Split oversized files if they become hard to maintain
- [ ] Keep server and client boundaries clean
- [ ] Review naming consistency across routes, models, and UI

## Testing Checklist

### 18. Technical Verification

- [ ] `npm run build` passes
- [ ] Prisma client generates successfully
- [ ] Prisma migrations run on a clean database
- [ ] Seed script runs successfully
- [ ] No broken route imports or alias issues

### 19. Public Website Verification

- [ ] `/en` renders correctly
- [ ] `/de` renders correctly
- [ ] course listing and detail pages work
- [ ] blog listing and detail pages work
- [ ] teachers page works
- [ ] FAQ page works
- [ ] contact page works
- [ ] placement page works
- [ ] all local images load correctly

### 20. Auth and Admin Verification

- [ ] admin can sign in
- [ ] editor can sign in
- [ ] anonymous user cannot access admin
- [ ] admin can manage users
- [ ] editor cannot manage users
- [ ] admin and editor can manage content

### 21. Lead Verification

- [ ] contact form creates a `Lead`
- [ ] placement form creates a `Lead`
- [ ] lead locale is stored correctly
- [ ] lead status can be updated in admin

## Recommended Execution Order

1. Finish dependency installation and fix package/runtime issues
2. Connect PostgreSQL and Prisma
3. Write real seed data
4. Replace frontend mock data with database reads
5. Wire contact and placement forms to the database
6. Add authentication
7. Build admin layout and content CRUD
8. Add role protections and user management
9. Final visual cleanup and testing

## Important Notes

- The current homepage implementation is a frontend milestone, not the final data architecture.
- The current `lib/site-data.js` should be treated as temporary mock content until Prisma-backed queries replace it.
- The CMS can be visually simple in phase 1, but permissions and data integrity must be correct.
- Media storage is external-URL based in the original plan, but local copies of current marketing images are now included for the public demo.
