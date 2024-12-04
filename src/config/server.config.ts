export default () => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION || '30m'
})