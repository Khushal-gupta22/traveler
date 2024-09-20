/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  // write the config according to my project
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; img-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';`,
          },
        ],
      },
    ]
  },
}

export default config
