export default async function handler(req, res) {
  const rawPath = typeof req.query.path === 'string' ? req.query.path : '';
  if (!rawPath.startsWith('/') || rawPath.includes('://') || rawPath.includes('..')) {
    return res.status(400).json({ error: 'invalid path' });
  }
  const upstream = `https://technocore.chat${rawPath}`;
  try {
    const response = await fetch(upstream, { headers: { Accept: req.headers.accept || 'text/plain' } });
    const body = await response.text();
    res.status(response.status).setHeader('Content-Type', response.headers.get('content-type') || 'text/plain; charset=utf-8');
    return res.send(body);
  } catch {
    return res.status(502).json({ error: 'Technocore upstream unavailable' });
  }
}
