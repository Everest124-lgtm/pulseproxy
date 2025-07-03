import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).send('Missing url parameter');
    return;
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type') || 'text/html';

    res.setHeader('content-type', contentType);
    const body = await response.text();

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
}
