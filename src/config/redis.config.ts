import { redisStore } from "cache-manager-redis-store";

export default () => ({
    caching: {
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD
    },

    cartPrefix: process.env.CART_PREFIX
})