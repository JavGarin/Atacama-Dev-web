# TASKS-002 — Backend Leads (SPEC-002)

## Done 2026-10-13 (local, sin keys prod)
- [x] T-201 Spec `.agents/specs/atacama-dev-web-002-backend-leads/spec.md`
- [x] T-202 `api/leads.js`: validación, honeypot, rate-limit 10/min, Supabase opcional, Resend opcional, `node --check` OK
- [x] T-203 `src/lib/leadClient.js`: `validateLead + submitLead` api→formsubmit→manual, `node --check` OK
- [x] T-204 Modal usa `submitLead`, botón reintento si manual, `.env.example` creado
- [x] T-205 `pnpm build` + `localhost:5173 200` post-cambio

## Pendiente por ti (prod)
- [ ] T-206 Crear Supabase `leads` (SQL en spec.md) + pegar `SUPABASE_URL/SERVICE_KEY` en Vercel env
- [~] T-207 Crear Resend + `RESEND_API_KEY + LEADS_TO_EMAIL/FROM` en Vercel env + `vercel --prod` → InProgress 2026-10-14
- [~] T-208 Probar `POST /api/leads` prod con honeypot y rate-limit → InProgress 2026-10-14
