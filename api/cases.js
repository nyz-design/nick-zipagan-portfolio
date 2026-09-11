const { verify } = require('./_session.js');
const { html } = require('./_cases.js');

module.exports = (req, res) => {
  if (!verify(req.headers.cookie)) {
    res.status(401).end();
    return;
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, private');
  res.status(200).send(html);
};
