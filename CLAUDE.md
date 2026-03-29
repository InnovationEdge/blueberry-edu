# BrightMind — bm-app (Design Reference App)
# This is the Vite + React Router frontend prototype
# For full platform documentation see: /Users/tiko/Desktop/MasterClass/brightmind/CLAUDE.md

## WHAT IS THIS APP
- Design reference implementation for BrightMind Academy
- Showcases all UI patterns before they go into the production monorepo
- Runs at localhost:5174 via Vite dev server
- React 18 + React Router + Tailwind CSS 4 + motion/react

## TECH STACK
- Framework: Vite 6.3 + React 18.3 + TypeScript
- Routing: React Router 7
- Styling: Tailwind CSS 4.1 + shadcn/ui components
- Animations: motion/react (framer-motion)
- Icons: lucide-react
- State: React Context (auth-context.tsx)
- i18n: Custom getAppT() with 3 languages (ქართული, English, Русский)

## STRUCTURE
```
src/
  app/
    pages/          # All page components (landing, home, course-detail, etc.)
    components/     # Shared components (header, course-card, course-row, etc.)
    components/ui/  # shadcn/ui primitives
    context/        # Auth context provider
    data/           # Course data (courses.ts)
    i18n/           # Translation strings (app.ts)
    routes.tsx      # React Router configuration
  styles/           # CSS (index.css, fonts.css, tailwind.css, theme.css)
  main.tsx          # Vite entry point
```

## DESIGN RULES — SAME AS MONOREPO
- Landing page: Netflix-ის ზუსტი სტილი (mosaic bg, convex curve, pink line)
- Inner pages: MasterClass-ის სტილი (dark cards, horizontal rows, minimal UI)
- Dark theme ONLY: #000000 background, #E50914 brand red
- Header: "BRIGHTMIND" white text logo (no B icon), language pill + Sign In
- All translations via i18n — no inline strings

## IMPORTANT NOTES
- This app uses LOCAL course data from `data/courses.ts` for prototyping
- The production monorepo will fetch ALL data from the Fastify API
- When porting UI from here to monorepo: replace local data with API calls
- lucide-react icons: some exports are default-only (like Gift) — check before importing
- Run with: `cd /Users/tiko/Desktop/bm-app && npx vite --port 5174`
