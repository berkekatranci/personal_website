# Berke Katranci Portfolio

Premium one-page portfolio and CV website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and structured content files.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Where to edit content

- Profile text, metrics, pillars, socials, and recruiter summary: `data/profile.ts`
- Projects: `data/projects.ts`
- CV timeline: `data/cv.ts`
- Skill groups: `data/skills.ts`
- Investment section: `data/investment.ts`
- Creative lab and 3D model placeholders: `data/creative.ts`
- Favorite games: `data/games.ts`
- Writing/media placeholders: `data/writing.ts`
- Hero image: `public/images/hero-systems.png`
- Game images: `public/images/games/*`
- Optional 3D models: place `.glb` or `.gltf` files under `public/models` and add their paths in `data/creative.ts`

Impressum and privacy text are legal placeholders. Replace them with jurisdiction-specific legal content before publishing.

## Deploy to Vercel

This project is ready for Vercel as a standard Next.js app.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Keep the framework preset as Next.js.
4. Use `npm install` as the install command and `npm run build` as the build command.
5. Deploy.

The `vercel.json` file pins the expected install and build commands.

## Database / Neon

The current website is static and does not need a database. Do not add Neon,
Prisma, Drizzle, or database environment variables until you introduce dynamic
features such as CMS-managed projects, writing entries, analytics,
authentication, or saved contact requests.

If a database is needed later, use Neon Postgres and add a `DATABASE_URL` value
in Vercel Project Settings. A template is included in `.env.example`.
