# Melany

Phase 1 foundation for a token-first creator platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Cloudinary, and an AI operator layer called `Mela`.

## Scope shipped in this phase

- App Router structure ready for public site, auth surface, creator dashboard, and API routes.
- Prisma schema designed for users, token wallets, payment rails, crypto, withdrawals, content, subscriptions, chat, live streaming, compliance, and AI memory.
- Seed script prepared to bootstrap the primary creator profile plus initial token packages and paid services.
- Public assets moved into `public/media` so the existing visuals can be reused inside Next.js immediately.

## Suggested install flow

1. Install dependencies with your preferred package manager.
2. Copy `.env.example` to `.env` and fill all required secrets.
3. Run `prisma generate`.
4. Run your first migration or `prisma db push`.
5. Seed the database with `prisma/seed.ts`.
6. Start the app in dev mode.

## Planned next phases

- Phase 2: Auth.js or Clerk integration, role-aware route protection, and the public Melany profile.
- Phase 3: Token checkout, crypto checkout, and adult high-risk payment provider webhooks.
- Phase 4: Creator finance dashboard, payout methods, and withdrawal operations.
- Phase 5: Mela AI orchestration, memory, automation rules, and fan support flows.
- Phase 6: Private chat, PPV messages, and LiveKit preparation.
- Phase 7: Colombia direct payment review pipeline and final polish.
