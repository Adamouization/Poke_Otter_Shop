const IMAGE_ORIGIN = 'https://i.ebayimg.com'

function isAllowedImagePath(path) {
  if (!path.startsWith('/images/')) return false

  return path.split('/').every((segment) => (
    segment === '' || /^[A-Za-z0-9._~-]+$/.test(segment)
  )) && !path.split('/').some((segment) => segment === '.' || segment === '..')
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).send('Method Not Allowed')
    return
  }

  const requestedPath = Array.isArray(request.query.path)
    ? request.query.path.join('/')
    : request.query.path
  const path = String(requestedPath || '')

  if (!isAllowedImagePath(path)) {
    response.status(400).send('Invalid image path')
    return
  }

  try {
    const upstream = await fetch(`${IMAGE_ORIGIN}${path}`, {
      headers: {
        Referer: 'https://pokeotter.jaamour.com/',
        'User-Agent': 'Poke Otter image proxy',
      },
    })

    if (!upstream.ok) {
      response.status(502).send('The listing image is unavailable')
      return
    }

    const contentType = upstream.headers.get('content-type') || ''
    if (!contentType.startsWith('image/')) {
      response.status(502).send('The listing image is unavailable')
      return
    }

    response.setHeader('Content-Type', contentType)
    response.setHeader('Cache-Control', 'public, s-maxage=31536000, immutable')
    response.status(200).send(Buffer.from(await upstream.arrayBuffer()))
  } catch {
    response.status(502).send('The listing image is unavailable')
  }
}
