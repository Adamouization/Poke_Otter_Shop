import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import listingsHandler from './api/listings.js'
import listingImageHandler from './api/listing-image.js'

function createResponse(response) {
  const adapter = {
    setHeader(name, value) {
      response.setHeader(name, value)
    },
    status(code) {
      response.statusCode = code
      return adapter
    },
    send(body) {
      response.end(body)
    },
  }

  return adapter
}

function localApi(handler) {
  return async (request, response, next) => {
    const url = new URL(request.url || '/', 'http://localhost')
    const query = Object.fromEntries(url.searchParams.entries())

    try {
      await handler({ method: request.method, query }, createResponse(response))
    } catch (error) {
      next(error)
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api',
      configureServer(server) {
        server.middlewares.use('/api/listings', localApi(listingsHandler))
        server.middlewares.use('/api/listing-image', localApi(listingImageHandler))
      },
    },
  ],
})
