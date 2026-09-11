const crypto = require('crypto');

const TTL_MS = 30 * 60 * 1000;

function secret() {
  return process.env.CASE_SECRET || process.env.CASE_PASSWORD || '';
}

function sign(exp) {
  return crypto.createHmac('sha256', secret()).update(String(exp)).digest('hex');
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function issue() {
  const exp = Date.now() + TTL_MS;
  return exp + '.' + sign(exp);
}

function verify(cookieHeader) {
  const raw = (cookieHeader || '')
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith('nzcase='));
  if (!raw) return false;
  const [exp, sig] = raw.slice('nzcase='.length).split('.');
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sign(Number(exp)), sig);
}

module.exports = { TTL_MS, issue, verify };
