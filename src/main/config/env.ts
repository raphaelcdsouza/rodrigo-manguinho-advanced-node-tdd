export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '575893240358378',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'b74c96884decdd94af69ae69cd607ee2'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '1j32j123wqjwle'
}
