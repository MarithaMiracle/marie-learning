# Deployment

The app is a Next.js application. It can run on Vercel with Neon, Supabase Postgres, or another hosted PostgreSQL 14 database.

The schema uses `pgcrypto` for password hashing (`crypt`, `gen_salt`) and for reset tokens (`gen_random_bytes`). New row ids use `gen_random_uuid()`, which is built into PostgreSQL 13 and newer.

Authentication is handled by the app (signed cookies and `pgcrypto` passwords). You do not need Supabase Auth, the Supabase JS client, or Supabase Storage for this release.

## 1. Create the database

### Local PostgreSQL

Create an empty database, then continue from step 2 with local URLs in `.env.local`.

```bash
createdb marie_learning
# or: npm run db:create
```

### Supabase Postgres

1. Create a project at [supabase.com](https://supabase.com).
2. Open **Project Settings → Database** and copy the URI connection strings.
3. Put the **postgres** user URI into `DATABASE_ADMIN_URL`. Use the **Direct** connection (`db.<project-ref>.supabase.co:5432`) or the **Session** pooler for migrate and seed. Always append `?sslmode=require` if it is not already present.
4. Choose a long `APP_DB_PASSWORD` (16+ characters). Use the same value in `APP_DB_PASSWORD` and in the password part of `DATABASE_URL`.
5. After migrate creates the `marie_app` role, set `DATABASE_URL` to the same host and database (`postgres` on Supabase) with user `marie_app` and that password, plus `?sslmode=require`.

Example shapes (replace the password and project ref):

```bash
DATABASE_ADMIN_URL=postgresql://postgres:YOUR_DB_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres?sslmode=require
DATABASE_URL=postgresql://marie_app:YOUR_APP_DB_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres?sslmode=require
APP_DB_PASSWORD=YOUR_APP_DB_PASSWORD
```

**Pooler notes**

| Connection | Port | Use for |
|---|---|---|
| Direct | 5432 on `db.<ref>.supabase.co` | Migrate, seed, local app |
| Session pooler | 5432 on `*.pooler.supabase.com` | Migrate, seed, local app |
| Transaction pooler | 6543 on `*.pooler.supabase.com` | Next.js runtime on Vercel only |

Do not run `npm run db:migrate` or `npm run db:seed` through the transaction pooler. Those scripts need session-scoped settings and DDL.

If the pooler requires a dotted username, use `postgres.<project-ref>` for admin and `marie_app.<project-ref>` for the app role.

The Node clients enable SSL automatically for non-localhost hosts and keep `prepare: false` so the transaction pooler works at runtime.

If `db.<ref>.supabase.co` does not resolve on your network (some networks only get an IPv6 address for Direct), use the Session pooler URIs above instead.

On Supabase, the `postgres` role is not a full superuser. The migrate script creates `marie_app` with the right attributes at `CREATE ROLE` time and does not run `ALTER ROLE … NOSUPERUSER` (that statement is rejected on Supabase).

### Other hosts (Neon, etc.)

1. Create a database.
2. Copy an administrator connection string into `DATABASE_ADMIN_URL`. The user must be allowed to create a role and run the migration. Include SSL as required by the host.
3. Choose a long `APP_DB_PASSWORD`.
4. Build `DATABASE_URL` for user `marie_app` with that password and the same host, database, and SSL options.

If the host does not allow `CREATE ROLE`, create `marie_app` in the host’s dashboard with `NOSUPERUSER NOBYPASSRLS`, then run the migration with a user that can create tables, functions, and policies. The migration still tries to create the role. If that statement is rejected, create the role yourself and run the SQL in `drizzle/001_init.sql` from the SQL editor. Then insert a row into `schema_migrations`:

```sql
CREATE TABLE IF NOT EXISTS schema_migrations (
  id text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO schema_migrations (id) VALUES ('001_init') ON CONFLICT DO NOTHING;
```

Grant the same privileges the migration grants to `marie_app`. Row level security is only meaningful when the app connects as `marie_app`, not as a superuser.

## 2. Environment variables

Set these in the host and in `.env.local` when you migrate from your computer:

| Name | Required | Purpose |
|---|---|---|
| `DATABASE_ADMIN_URL` | For migrate and seed only | Administrator connection. Do not put this in the Vercel runtime if you seed from your computer. |
| `DATABASE_URL` | Yes | `marie_app` connection used by the website |
| `APP_DB_PASSWORD` | For migrate | Password stored for `marie_app` |
| `SESSION_SECRET` | Yes | At least 32 characters. Signs the login cookie. |
| `INSTRUCTOR_EMAIL` | For seed | First instructor email |
| `INSTRUCTOR_PASSWORD` | For seed | First instructor password |
| `INSTRUCTOR_NAME` | No | Display name |
| `INSTRUCTOR_TIMEZONE` | No | Used when the instructor enters class times |
| `ALLOW_STUDENT_REGISTRATION` | No | `true` shows `/register`. Use `false` if only the instructor should create students. |
| `SEED_DEMO_STUDENT` | No | Keep `false` in production |
| `SEED_FORCE` | No | `true` overwrites instructor edits. Leave `false`. |
| `SEED_RESET_PASSWORDS` | No | `true` replaces seeded passwords. Leave `false` after the first seed. |
| `APP_URL` | Recommended | Public site URL with no trailing slash, used in password-reset links |
| `RESEND_API_KEY` | No | Sends reset emails when set |
| `EMAIL_FROM` | With Resend | From address Resend is allowed to use |

`SESSION_SECRET`, database URLs, and passwords are secret. Do not commit `.env.local`.

## 3. Migrate and seed

From your computer, with production URLs in the environment:

```bash
npm run db:migrate
npm run db:seed
```

Seeding needs the 16 files in `content/weeks`. Run `npm run check:content` first.

Sign in as the instructor and create the first student from **Students**. Share the temporary password through a private channel. Ask the student to change it in **Settings**.

On Supabase you can confirm the role exists in the SQL editor:

```sql
SELECT rolname FROM pg_roles WHERE rolname = 'marie_app';
```

## 4. Vercel

1. Import the Git repository.
2. Framework preset: **Next.js**.
3. Leave **Output Directory** empty. Do not set it to `public`. That setting is for static sites and will fail this app after `next build`.
4. Build command: `npm run build` (the default for Next.js).
5. Add the runtime variables: `DATABASE_URL`, `SESSION_SECRET`, `APP_URL`, `ALLOW_STUDENT_REGISTRATION`, and the optional email variables.
6. Do not set `DATABASE_ADMIN_URL`, `APP_DB_PASSWORD`, or `SEED_DEMO_STUDENT` on the website.
7. Deploy.

The repo includes `vercel.json` with the Next.js framework preset so Vercel does not treat the project as a static export.

The login cookie is `httpOnly`, `sameSite=lax`, and `secure` when `NODE_ENV` is `production`.

File uploads on assignments are stored in PostgreSQL and limited to 2 MB. Vercel request limits still apply, so ask students to submit a GitHub URL or written work when a file is large.

## 5. After deployment

- Create the instructor by seeding, then sign in.
- Create a student and complete onboarding on that account, including the operating system question.
- Open Week 1, mark a lesson complete, submit the week assignment, and take the quiz.
- As the instructor, schedule a class, review the submission, and confirm the student sees the feedback.
- Confirm a student cannot open `/instructor/dashboard` or another student’s work.

There is no payment, video call, or certificate feature in this release. Class links are meeting URLs that you paste in, such as a Zoom or Google Meet link.
