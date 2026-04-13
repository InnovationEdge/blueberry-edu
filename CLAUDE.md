# Blueberry Academy — blueberry-edu

## რა არის
პროფესიონალური სასწავლებელი ლაივ ვორკშოპებით Google Meet-ზე.
კურსდამთავრებულები იღებენ პრაქტიკულ ცოდნას წამყვანი პროფესიონალებისგან, მათ შორის Blueberry Systems-ის სპეციალისტებისგან.

## არქიტექტურა
```
blueberry-edu/                    # GitHub: InnovationEdge/blueberry-edu (public)
├── apps/
│   ├── web/                      # blueberryedu.ge — public site
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── pages/        # 8 pages: landing, courses-catalog, course-detail, masterclass, certificates, career, about, certificate
│   │   │   │   ├── components/   # landing-header, landing-footer, course-card-landing, hero-canvas, logo, certificate-preview
│   │   │   │   ├── hooks/        # use-landing-courses, use-course-detail, use-masterclasses, use-registration, use-landing-content, use-document-title
│   │   │   │   ├── i18n/         # app.ts (legacy hero), pages.ts (140+ keys, KA/EN/RU)
│   │   │   │   ├── context/      # auth-context (language, login)
│   │   │   │   └── data/         # courses-landing.ts (fallback)
│   │   │   ├── lib/
│   │   │   │   ├── supabase.ts   # Supabase client with customFetch (removes auth header)
│   │   │   │   └── supabase-api.ts # API layer: fetchCourses, submitRegistration, validation
│   │   │   └── styles/           # tailwind.css, theme.css, fonts.css
│   │   ├── public/               # hero-bg.mp4, images/logos, robots.txt, sitemap.xml
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── admin-app/                # admin.blueberryedu.ge — CMS
│       ├── src/
│       │   ├── pages/            # dashboard, courses-list, course-editor, masterclasses, registrations, content
│       │   ├── lib/supabase.ts   # Supabase client (env vars)
│       │   └── main.tsx          # Auth provider, routes, QueryClient
│       ├── package.json
│       └── vite.config.ts
│
├── supabase/
│   ├── migrations/               # 001-013: schema, RLS, triggers, CMS tables, indexes
│   └── functions/                # on-registration (Edge Function: email + Google Sheets)
│
├── CLAUDE.md                     # This file
└── .gitignore
```

## ტექ სტეკი
- **Frontend:** React 18 + Vite 6 + TypeScript + Tailwind CSS 4
- **Animations:** motion/react (framer-motion)
- **Data:** @tanstack/react-query + Supabase JS client
- **Icons:** lucide-react
- **i18n:** Custom getAppT() + getPageT() — 3 ენა (KA/EN/RU)
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Hosting:** Vercel (2 projects, auto-deploy on git push)

## Vercel Setup
| Project | Root Dir | Domain | Auto-deploy |
|---------|----------|--------|-------------|
| web | apps/web | blueberryedu.ge | git push → auto |
| admin-app | apps/admin-app | admin.blueberryedu.ge | git push → auto |

Env vars (both projects): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Database Tables (Supabase)
- `courses` — id, title, description, tribe, duration, price, format, gradient, logo, image_url, mentor_name/role/photo/bio, schedule, level, language, learning_outcomes, popular
- `course_syllabus` — course_id, title, topics[], sort_order
- `course_faq` — course_id, question, answer, sort_order
- `masterclasses` — id, course_id, date, time
- `course_registrations` — full_name, email, phone, course_id (unique index on course_id + lower(email))
- `masterclass_registrations` — full_name, email, phone, masterclass_id (unique index)
- `landing_stats` — value, suffix, label, sort_order
- `landing_testimonials` — quote, name, role, avatar, sort_order
- `landing_faq` — question, answer, sort_order
- Storage bucket: `course-assets` (public)

## ბიზნეს მოდელი
- კურსს ყიდულობ (ერთჯერადი გადახდა)
- ლაივ ვორკშოპები Google Meet-ზე (5-8 სესია კურსის მიხედვით)
- არა უვადო წვდომა, არა subscription
- სერტიფიკატი კურსის დასრულებისას
- Blueberry Systems — პარტნიორი სოფტვეარ კომპანია (სტაჟირება, დასაქმება)

## Commands
```bash
# Web dev
cd apps/web && npm run dev

# Admin dev
cd apps/admin-app && npm run dev

# Deploy (auto)
git push origin main
```

## Git
- Repo: InnovationEdge/blueberry-edu (public)
- Branch: main
- Author: InnovationEdge <ikerdikoshv@gmail.com>
- Vercel auto-deploy on push
