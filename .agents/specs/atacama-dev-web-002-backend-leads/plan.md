# PLAN-002 — Backend Leads: arquitectura y decisiones

## 1. Problema a resolver
`ProjectPlannerModal` dependía de `formsubmit.co` directo: sin validación backend, sin DB, sin rate-limit, con CORS/adblock potencial. Lead perdido si FormSubmit caía.

## 2. Solución elegida
Cadena de fallbacks sin romper UX:
```
POST /api/leads (8s timeout)
  └─ ok: persiste Supabase (opcional) + notifica Resend (opcional)
  └─ falla → FormSubmit AJAX (10s)
              └─ falla → modo manual: modal muestra mailto + clipboard
```

## 3. Por qué esta arquitectura

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| Serverless Vercel (api/leads.js) | Express/Railway/Render | Cero infra adicional; ya deployamos en Vercel |
| Supabase opcional (env vars) | DB siempre requerida | Permite arrancar sin keys; se activa cuando el volumen lo justifica |
| Resend opcional (env vars) | SendGrid / Nodemailer | Tier gratis 3k/mes; zero config; más confiable que FormSubmit |
| FormSubmit como fallback | Sin fallback | Si /api/leads falla en cold-start, igual llega el lead |
| Rate-limit en memoria (Map) | Redis/Upstash | Volumen ~12 leads/mes; overhead de Redis injustificado |
| Honeypot (company+website) | CAPTCHA | UX sin fricción; suficiente para spam de bots |

## 4. Archivos involucrados

| Archivo | Rol |
|---|---|
| `api/leads.js` | Handler serverless: validación, honeypot, rate-limit, Supabase, Resend |
| `src/lib/leadClient.js` | Cliente frontend: validateLead + submitLead con cadena fallbacks |
| `vercel.json` | Habilita api/*.js como funciones Node 20, región GRU (São Paulo) |
| `.env.example` | Documenta las 6 env vars necesarias, nunca commitear `.env*` |

## 5. Env vars (mínimo para activar Resend)

```
RESEND_API_KEY=re_xxxxxxxx          # Obligatorio para notificación
LEADS_TO_EMAIL=contacto.atacamadev@gmail.com
LEADS_FROM_EMAIL=onboarding@resend.dev   # Usar hasta verificar dominio propio
```

## 6. Decisión DB (Supabase) — análisis 2026-10-14

Volumen actual: 1–3 leads/semana (~12/mes). **Supabase se posterga** por:
- Overhead: proyecto Supabase se pausa en tier gratis por inactividad.
- YAGNI: inbox Gmail es suficiente para ese volumen.
- El código ya está listo (`persistSupabase` en api/leads.js). Solo requiere agregar 3 env vars cuando el volumen lo justifique (>20 leads/mes o necesidad de historial buscable).

## 7. Limitaciones conocidas (documentadas, no bloqueantes)

- Rate-limit en memoria se reinicia con cada cold-start de Vercel Functions. Con 12 leads/mes es irrelevante.
- CORS `*` aceptable para portfolio; restringir al dominio propio si se expone a terceros.
- `LEADS_FROM_EMAIL=onboarding@resend.dev` es dominio compartido de Resend. Para email con dominio propio (`@atacamadev.cl`) verificar dominio en Resend dashboard.
