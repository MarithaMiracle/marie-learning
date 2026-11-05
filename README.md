# Marie Learning Platform

A learning platform for an instructor-led, 16-week beginner programme: **Full-Stack Software Development for Beginners**.

Students get onboarding, lessons, assignments, quizzes, progress, a class schedule, resources, and announcements. Instructors manage students, the curriculum, grading, classes, and announcements. The programme does not promise a job or expert-level skill after four months.

## What you need

- Node.js 20 or newer
- npm
- PostgreSQL 14 or newer

The app talks to PostgreSQL as a restricted role named `marie_app`. Migrations and seeding use a separate administrator connection. A hosted Postgres database, including Neon or Supabase Postgres, can replace the local database. Authentication is handled by the app, not by Supabase Auth.

## Install

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`. Generate `SESSION_SECRET` and `APP_DB_PASSWORD` with a password manager or:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Use the same password in `APP_DB_PASSWORD` and in the `marie_app` user of `DATABASE_URL`.

## Database

Create an empty database, then apply the schema and seed the course.

```bash
createdb marie_learning
npm run db:migrate
npm run db:seed
```

`db:migrate` creates the `marie_app` role, applies `drizzle/001_init.sql` once, and records that in `schema_migrations`. Running it again does not rebuild the tables.

`db:seed` loads the 16 week files in `content/weeks`, the instructor account, the official documentation links, and a welcome announcement. It does not duplicate modules. It does not overwrite lessons, assignments, or quizzes that an instructor has edited, unless you set `SEED_FORCE=true`.

Set `SEED_DEMO_STUDENT=true` before seeding if you want a local student account for testing. Set `SEED_RESET_PASSWORDS=true` only when you intend to replace the instructor or demo student password from `.env.local`.

## First accounts

The instructor is created from `INSTRUCTOR_EMAIL`, `INSTRUCTOR_PASSWORD`, and `INSTRUCTOR_NAME`.

Sign in at `/login`. From **Students**, create a student, choose a temporary password, and give those details to the student. The student is enrolled in the programme. They complete onboarding, including their operating system, the first time they sign in.

If `ALLOW_STUDENT_REGISTRATION=true`, a student can also open `/register` and create an account. That account is enrolled automatically. Turn this off in production if you want the instructor to create every account.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run typecheck
npm run check:content
npm test
npm run build
```

`check:content` confirms that all 32 lessons meet the teaching checklist before you seed.

## Deploy

See [docs/deployment.md](docs/deployment.md).

## Course content

Student lessons, instructor session guides, assignments, and quizzes live in `content/weeks/week01.ts` through `week16.ts`. The instructor can edit lessons and assignments in the app. An edited row is marked customised and is kept on the next seed.

Official documentation in the resources library is a reference. It does not replace the lessons.
