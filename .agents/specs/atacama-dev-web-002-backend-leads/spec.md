# SPEC-002 — Backend Leads Atacama Dev (api/leads + fallback)

- ID: `atacama-dev-web-002-backend-leads` | Fecha: 2026-10-13 | Estado: `Implementado local, pendiente keys prod`
- Depende de: SPEC-001 landing actual

## 1. Problema
`ProjectPlannerModal` hacía `fetch formsubmit.co/ajax/...` directo, sin validación, sin DB, sin rate-limit, con número WhatsApp placeholder `56900000000`. Si FormSubmit caía o bloqueaba CORS/adblock, lead perdido.

## 2. Solución
Backend propio serverless `api/leads.js` (formato Vercel) + cliente `src/lib/leadClient.js` con cadena de fallbacks:
`POST /api/leads (8s timeout)` → `FormSubmit AJAX` → `modo manual mailto+clipboard (sendSuccess=false)`

## 3. Contrato API
`POST /api/leads` body: `{type, stage, name, email, phone?, description?, company?, website?, origin?, userAgent?}`
- 200 `{ok:true, id, persisted, notified, fallback}` | 400 `{ok:false, error, details?}` | 405 solo POST | 429 rate-limit | 500 error interno
- Validación: type∈[web,software,ecommerce,mercadopublico], stage∈[idea,specs,upgrade], name≥2, email regex, description≤2000, phone≤30, honeypot `company`+`website` deben ir vacíos.
- Rate-limit memoria: 10 req/min por IP (`x-forwarded-for` o socket).
- Persistencia opcional: si `SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY + SUPABASE_LEADS_TABLE` existen → `fetch POST rest/v1/<table>` con `apikey + Bearer`. Si no, `persisted:false`.
- Notificación opcional: si `RESEND_API_KEY + LEADS_TO_EMAIL` existen → `fetch api.resend.com/emails` desde `LEADS_FROM_EMAIL`. Si no, `notified:false`.
- Sin keys igual responde 200 para no romper UX local; log `[leads]` indica modo degradado.
- CORS: `*` + `POST,OPTIONS`, `content-type`. `OPTIONS` → 204.

## 4. Cliente frontend
`validateLead()` puro JS (sin deps): retorna `{ok, errors, sanitized}`. `submitLead()` intenta `/api/leads`, luego FormSubmit, nunca lanza — siempre `{ok, via, ...}`.
Modal: `handleSubmitProposal` usa `submitLead`, `sendSuccess=true` solo si `via==='api'||via==='formsubmit'`. Paso 4 muestra botón primario `Reintentar envío automático` si fallback manual.

## 5. Env vars (ver `.env.example`, nunca commitear `.env*`)
`SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_LEADS_TABLE=leads, RESEND_API_KEY, LEADS_TO_EMAIL=contacto.atacamadev@gmail.com, LEADS_FROM_EMAIL=onboarding@resend.dev`
SQL Supabase (ejecutar una vez):
```sql
create table if not exists leads (id uuid default gen_random_uuid() primary key, created_at timestamptz default now(), type text, stage text, name text, email text, phone text, description text, origin text);
alter table leads enable row level security;
```

## 6. No-alcance
Sin auth/panel admin, sin pagos, sin adjuntos. WhatsApp placeholder se mantiene oculto hasta configurar número real.

## 7. Aceptación
AC-01 `pnpm build` verde. AC-02 modal envía vía `api` en Vercel con keys, vía `formsubmit` sin keys, nunca rompe. AC-03 spam con honeypot → 400 sin persistir. AC-04 `.env*` ignorado.
