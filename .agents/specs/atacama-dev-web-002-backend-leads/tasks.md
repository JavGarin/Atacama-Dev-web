# TASKS-002 — Backend Leads (SPEC-002)

## Done 2026-10-13 (local, sin keys prod)
- [x] T-201 Spec `.agents/specs/atacama-dev-web-002-backend-leads/spec.md`
- [x] T-202 `api/leads.js`: validación, honeypot, rate-limit 10/min, Supabase opcional, Resend opcional, `node --check` OK
- [x] T-203 `src/lib/leadClient.js`: `validateLead + submitLead` api→formsubmit→manual, `node --check` OK
- [x] T-204 Modal usa `submitLead`, botón reintento si manual, `.env.example` creado
- [x] T-205 `pnpm build` + `localhost:5173 200` post-cambio

## Estado en Producción (2026-10-14)
- [x] T-206 Supabase leads: Postergado conscientemente por bajo volumen (1-3 leads/semana). Arquitectura YAGNI documentada en plan.md.
- [x] T-207 Configuración Vercel Serverless (`vercel.json` canónico) + build deployado exitosamente en `atacama-dev.app`.
- [x] T-208 Probar `POST /api/leads` prod con honeypot y rate-limit → Done 2026-10-14.
  - Evidencia 1 (Payload válido): HTTP 200 OK (`https://atacama-dev.app/api/leads`).
  - Evidencia 2 (Honeypot bot con campo `company`): HTTP 400 Bad Request.
  - Evidencia 3 (Rate limit): HTTP 429 en intento 11 tras ventana de 10 req/min.
