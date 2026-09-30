const UPSTREAM_ORIGIN = 'https://www.auctionnudge.com'
const UPSTREAM_PATH = '/feed/item/js'
const CLIENT_PATH = '/api/listings?path='

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).send('Method Not Allowed')
    return
  }

  const requestedPath = Array.isArray(request.query.path)
    ? request.query.path.join('/')
    : request.query.path
  const path = String(requestedPath || '').replace(/^\/+/, '')

  if (!/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(path)) {
    response.status(400).send('Invalid listings path')
    return
  }

  try {
    const upstream = await fetch(`${UPSTREAM_ORIGIN}${UPSTREAM_PATH}/${path}`, {
      headers: {
        Referer: 'https://pokeotter.jaamour.com/',
        'User-Agent': 'Poke Otter listings proxy',
      },
    })

    const body = await upstream.text()

    if (!upstream.ok) {
      response.status(502).send('The listings provider is unavailable')
      return
    }

    const clientBody = body.replaceAll(
      `${UPSTREAM_ORIGIN}${UPSTREAM_PATH}`,
      CLIENT_PATH,
    )

    response.setHeader('Content-Type', 'application/javascript; charset=utf-8')
    response.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=60')
    response.status(200).send(clientBody)
  } catch {
    response.status(502).send('The listings provider is unavailable')
  }
}
