export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '575893240358378',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'b74c96884decdd94af69ae69cd607ee2'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '1j32j123wqjwle',
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY ?? 'AKIAX6ZRHVCYLGG5S4OZ',
    secret: process.env.AWS_S3_SECRET ?? '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',
    bucket: process.env.AWS_S3_BUCKET ?? 'manguinho-teste'
  }
}
