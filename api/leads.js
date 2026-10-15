// ATACAMA DEV — POST /api/leads (serverless Vercel / Node)
// SPEC-002: valida, rate-limitea, persiste Supabase (opcional), notifica Resend (opcional).

const ALLOWED_TYPES = ['web', 'software', 'ecommerce', 'mercadopublico'];
const ALLOWED_STAGES = ['idea', 'specs', 'upgrade'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY = 1_000_000;

// Rate-limit en memoria: 10 req/min por IP.
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_HITS = 10;

function clientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_HITS;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function persistSupabase(lead) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE || 'leads';
  if (!url || !key) return { persisted: false, reason: 'supabase-not-configured' };
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ ...lead, created_at: new Date().toISOString() }),
  });
  if (!res.ok) return { persisted: false, reason: `supabase-${res.status}` };
  const rows = await res.json().catch(() => []);
  return { persisted: true, id: rows?.[0]?.id || null };
}

async function notifyResend(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL || 'contacto.atacamadev@gmail.com';
  const from = process.env.LEADS_FROM_EMAIL || 'onboarding@resend.dev';
  if (!apiKey) return { notified: false, reason: 'resend-not-configured' };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Atacama Dev <${from}>`,
      to: [to],
      subject: `Nueva Propuesta: ${lead.type} - ${lead.name}`,
      text: `Tipo: ${lead.type} | Etapa: ${lead.stage}\nNombre: ${lead.name} | Email: ${lead.email} | Tel: ${lead.phone || '-'}\n---\n${lead.description || 'Sin descripcion.'}`,
    }),
  });
  if (!res.ok) return { notified: false, reason: `resend-${res.status}` };
  return { notified: true };
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'Demasiados intentos, espera un minuto' });
    return;
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : await readJsonBody(req);
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message || 'Body inválido' });
    return;
  }

  const checked = validateLead(body || {});
  if (!checked.ok) {
    res.status(400).json({ ok: false, error: 'Datos inválidos', details: checked.errors });
    return;
  }

  try {
    const [persist, notify] = await Promise.all([persistSupabase(checked.sanitized), notifyResend(checked.sanitized)]);
    res.status(200).json({
      ok: true,
      id: persist.id || null,
      persisted: persist.persisted,
      notified: notify.notified,
      fallback: !persist.persisted && !notify.notified ? 'env-not-configured' : null,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'Error interno, intenta por correo directo' });
  }
}

function validateLead(body) {
  const errors = {};
  const s = (v, max) => String(v ?? '').trim().slice(0, max);
  if (String(body.company ?? '').trim() !== '' || String(body.website ?? '').trim() !== '') {
    return { ok: false, errors: { _spam: 'spam detected' }, sanitized: null };
  }
  const type = s(body.type, 32);
  const stage = s(body.stage, 32);
  const name = s(body.name, 120);
  const email = s(body.email, 160).toLowerCase();
  const phone = s(body.phone, 30);
  const description = s(body.description, 2000);
  if (!ALLOWED_TYPES.includes(type)) errors.type = 'Tipo inválido';
  if (!ALLOWED_STAGES.includes(stage)) errors.stage = 'Etapa inválida';
  if (name.length < 2) errors.name = 'Nombre requerido (mín 2)';
  if (!EMAIL_RE.test(email)) errors.email = 'Email inválido';
  if (Object.keys(errors).length > 0) return { ok: false, errors, sanitized: null };
  return { ok: true, errors: null, sanitized: { type, stage, name, email, phone, description } };
}


