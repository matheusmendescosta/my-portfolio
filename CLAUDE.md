# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server
```

No test runner is configured — CI only runs `lint` and `build` via `.github/workflows/test.yml`.

**Docker (development):**
```bash
docker-compose up   # Starts frontend on port 3000
```

## Architecture

Next.js 15 App Router portfolio site with internationalization, dark mode, and an external blog API.

### Key patterns

- **Pages are thin** — `src/app/**/page.tsx` files just render a single component from `src/components/pages/`.
- **Logic lives in hooks** — client-side data fetching and form state use custom `use-*.ts` hooks co-located with their component.
- **Translations** — `next-intl` with locale stored in a `NEXT_LOCALE` cookie. Locale config: `src/i18n/config.ts` (locales: `pt-br`, `en`). Message files: `src/messages/{locale}.json`. Access via `useTranslations('components.pages.home.contact_section')` — the key path mirrors the component path.
- **Theme** — dark/light mode managed by `ThemeContext` in `src/contexts/ThemeProvider.tsx`, persisted in `localStorage`.
- **UI components** — shadcn/ui components live in `src/components/ui/`. Project-specific UI (Navbar, Footer, DarkMode, LocaleSwitcher) also in `src/components/ui/`.
- **Utility** — `cn()` helper in `src/lib/utils.ts` wraps `clsx` + `tailwind-merge`.

### Pages

| Route | Description |
|---|---|
| `/` | Home page: Header, About, Education, Work Experience, Projects, Contact |
| `/brain` | Blog listing — fetches posts from external API (`NEXT_PUBLIC_API_URL`) |
| `/brain/post/[post_id]` | Individual blog post with comments, likes, save, and share |
| `/api/contact/me` | POST — sends email via nodemailer with Cloudflare Turnstile CAPTCHA verification |
| `/api/health` | Health check endpoint |
| `/sitemap.xml` | Dynamic sitemap |
| `/robots.ts` | Robots config |
| `/llms.txt` and `/llms-en.txt` | LLM-readable content about the portfolio owner |

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | External API base URL for Brain (blog) section |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (default: `https://matheusmendes.dev`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_CLOUDFLARE_SITE_KEY` | Cloudflare Turnstile site key (contact form) |
| `CLOUDFLARE_TURNSTILE_SECRET` | Cloudflare Turnstile secret (server-side) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | Email sending credentials |

### Build output

`next.config.ts` uses `output: "standalone"` for Docker deployment.
