KROKI:
1) Wrzuć zawartość tego folderu do repo na GitHub.
2) Netlify → New project → Import from Git → Deploy.
3) Site settings → Environment variables dodaj:
   - DATABASE_URL = postgresql://postgres:HASLO@db.<PROJECT_ID>-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require
   - DIRECT_URL   = postgresql://postgres:HASLO@db.<PROJECT_ID>.supabase.co:5432/postgres?sslmode=require
4) W Supabase → SQL Editor wklej `supabase_init.sql` i Run.
5) Odwiedź /admin.
