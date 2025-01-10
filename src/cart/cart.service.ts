import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CartService {
    private redisClient: Redis;
    constructor(private configService: ConfigService) {
        this.redisClient = new Redis({
            host: this.configService.get('caching.host'),
            port: this.configService.get('caching.port'),
            password: this.configService.get('caching.password')
        });
    }
    async addToCart(userEmail: string, productName: string, price: number): Promise<void> {

        const cartKey = `${this.configService.get<string>('cartPrefix')}:${userEmail}`;

        const checkedHash = this.redisClient.hgetall(cartKey)

        if (Object.keys(checkedHash).length === 0) {
            const now = new Date();
            const order_date = now.toISOString().slice(0, 19).replace('T', ' ');

            await this.redisClient.hset(cartKey, 'Order Date', order_date)
        }
        await this.redisClient.hset(cartKey, productName, price);
    }

    async getCart(userEmail: string): Promise<any> {
        const cartKey = `${this.configService.get<string>('cartPrefix')}:${userEmail}`;

        return await this.redisClient.hgetall(cartKey);
    }

    async removeFromCart(userEmail: string, productName: string): Promise<void> {
        const cartKey = `${this.configService.get<string>('cartPrefix')}:${userEmail}`;

        const checkedHash = this.redisClient.hgetall(cartKey)

        if (Object.keys(checkedHash).length <= 2) {
            await this.redisClient.del(cartKey)
        }
        else {
            await this.redisClient.hdel(cartKey, productName);
        }
    }

    async clearCart(userEmail: string): Promise<void> {
        const cartKey = `${this.configService.get<string>('cartPrefix')}:${userEmail}`;

        await this.redisClient.del(cartKey);
    }
}
