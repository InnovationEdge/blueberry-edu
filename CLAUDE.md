# Blueberry Academy — blueberry-edu

## WHAT IS THIS
Online education platform (courses + live Google Meet masterclasses).
Georgian language. Monorepo with two apps and shared Supabase backend.

## ARCHITECTURE
```
apps/
  web/         → blueberryedu.ge (public site — React + Vite)
  admin-app/   → admin.blueberryedu.ge (CMS — React + Vite)
supabase/
  migrations/  → PostgreSQL schema
  functions/   → Edge Functions (email, Google Sheets)
```

## TECH STACK
- Frontend: React 18 + Vite 6 + TypeScript + Tailwind CSS 4 + motion/react
- Backend: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- Hosting: Vercel (2 projects, 1 repo)
- Icons: lucide-react
- Data: @tanstack/react-query + Supabase JS client

## COMMANDS
```bash
# Web app
cd apps/web && npm run dev

# Admin app
cd apps/admin-app && npm run dev

# Deploy (auto via git push, or manual)
git push origin main
```

## VERCEL SETUP
- `blueberry-web` project → Root: `apps/web` → blueberryedu.ge
- `blueberry-admin` project → Root: `apps/admin-app` → admin.blueberryedu.ge
- Env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (both projects)

## DATABASE TABLES
- courses, course_syllabus, course_faq
- masterclasses
- course_registrations, masterclass_registrations
- landing_stats, landing_testimonials, landing_faq
- Storage bucket: course-assets
