const { TTL_MS, issue } = require('./_session.js');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  const expected = process.env.CASE_PASSWORD || '';
  if (!expected) {
    res.status(500).json({ ok: false, error: 'CASE_PASSWORD is not set' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const given = body && typeof body.password === 'string' ? body.password.trim() : '';

  if (given !== expected) {
    res.status(401).json({ ok: false });
    return;
  }

  res.setHeader(
    'Set-Cookie',
    'nzcase=' + issue() + '; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=' + Math.floor(TTL_MS / 1000)
  );
  res.status(200).json({ ok: true });
};
