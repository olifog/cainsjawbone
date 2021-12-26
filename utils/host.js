
const host = process.env.VERCEL_ENV === 'development'
  ? 'http://localhost:3000'
  : `https://${process.env.VERCEL_URL}`

export default host
