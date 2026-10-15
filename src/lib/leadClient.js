// Cliente leads SPEC-002 — sin dependencias.
// Cadena: POST /api/leads (8s) -> FormSubmit AJAX -> manual.
const API_URL = '/api/leads';
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/contacto.atacamadev@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead({ type, stage, name, email, phone, description }) {
  const errors = {};
  const clean = {
    type: String(type || '').trim(),
    stage: String(stage || '').trim(),
    name: String(name || '').trim().slice(0, 120),
    email: String(email || '').trim().toLowerCase().slice(0, 160),
    phone: String(phone || '').trim().slice(0, 30),
    description: String(description || '').trim().slice(0, 2000),
  };
  if (!['web', 'software', 'ecommerce', 'mercadopublico'].includes(clean.type)) errors.type = true;
  if (!['idea', 'specs', 'upgrade'].includes(clean.stage)) errors.stage = true;
  if (clean.name.length < 2) errors.name = true;
  if (!EMAIL_RE.test(clean.email)) errors.email = true;
  return { ok: Object.keys(errors).length === 0, errors, sanitized: clean };
}

async function postJson(url, payload, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } finally {
    clearTimeout(t);
  }
}

export async function submitLead(input) {
  // 1. Backend propio.
  try {
    const r = await postJson(API_URL, input, 8000);
    if (r.ok && r.data?.ok) return { ok: true, via: 'api', ...r.data };
  } catch (e) {
    console.warn('[leads] api no disponible, fallback formsubmit:', e?.message || e);
  }
  // 2. FormSubmit legacy (sin DB, pero notifica por email).
  try {
    const r = await postJson(
      FORMSUBMIT_URL,
      {
        _subject: `Nueva Propuesta: ${input.type} - ${input.name}`,
        Cliente: input.name,
        Email: input.email,
        Telefono_WhatsApp: input.phone || 'No especificado',
        Tipo_de_Solucion: input.type,
        Etapa_del_Proyecto: input.stage,
        Descripcion: input.description || 'Sin descripcion',
        _template: 'table',
      },
      10000
    );
    if (r.ok) return { ok: true, via: 'formsubmit' };
  } catch (e) {
    console.warn('[leads] formsubmit fallido, modo manual:', e?.message || e);
  }
  // 3. Manual: el modal muestra mailto + copiar.
  return { ok: false, via: 'manual' };
}
