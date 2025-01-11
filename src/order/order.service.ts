import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './repository/order.repository';
import { CartService } from 'src/cart/cart.service';
import { Order } from './entities/order.entity';
import { Equal } from 'typeorm';
import { OrderUpdate } from './dto/update.dto';
import { ConfigService } from '@nestjs/config';
import { OrderStatus } from './enum/status.enum';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository, @Inject(forwardRef(() => CartService)) private cartService: CartService, private configService: ConfigService) { }

    async createOrder(userEmail: string) {
        const cart = await this.cartService.getCart(userEmail);

        const order_date = cart['Order Date'];

        const order = await this.find({ 'client_Mail': userEmail, 'orderDate': order_date })
        if (order.length !== 0) {
            if (order[0]['status'] === OrderStatus.inProgress) {
                return await this.updateOrder(userEmail)
            }
        }
        const totalPrice: number = Object.entries(cart).reduce((sum, [key, value]) => {
            if (key !== 'Order Date') {
                const price = Number(value);
                if (!isNaN(price)) {
                    return sum + price;
                }
            }
            return sum;
        }, 0);

        console.log(cart)


        const products = Object.keys(cart).filter((key) => key !== 'Order Date')

        if (products.length === 0) {
            throw new NotFoundException(`Your Cart is empty`);
        }


        const newOrder: Order = {
            client_Mail: userEmail,
            products: products,
            price: totalPrice,
            status: OrderStatus.inProgress,
            orderDate: order_date
        }

        return this.orderRepository.createOrder(newOrder)
    }

    async find(queries: Record<string, any>) {
        const conditions: Record<string, any> = {};

        Object.entries(queries).forEach(([key, value]) => {
            if (key === 'price' || key === 'orderRate') {
                conditions[key] = Equal(parseFloat(value));
            } else if (key === 'status') {
                conditions[key] = Equal(value as 'in progress' | 'canceled' | 'shipped' | 'completed');
            } else if (key === 'client_Mail') {
                conditions[key] = Equal(value);
            } else if (key === 'orderDate') {
                conditions[key] = Equal(value);
            }
        });

        return await this.orderRepository.find(conditions);
    }

    async updateOrder(userEmail: string) {
        const cart = await this.cartService.getCart(userEmail);

        const orderDate = cart['Order Date']
        const queries = {
            client_Mail: userEmail,
            orderDate: orderDate
        }

        const orders = await this.find(queries);
        const order = orders && orders[0];
        if (!order) {
            throw new NotFoundException(`Order not found for the specified criteria`);
        }

        if (order['status'] !== OrderStatus.inProgress) {
            throw new NotFoundException(`Your Order's status : ${order['status']} and you can make a new order`);
        }

        const totalPrice: number = Object.entries(cart).reduce((sum, [key, value]) => {
            if (key !== 'Order Date') {
                const price = Number(value);
                if (!isNaN(price)) {
                    return sum + price;
                }
            }
            return sum;
        }, 0);

        const products = Object.keys(cart).filter((key) => key !== 'Order Date');

        const updateOrder: OrderUpdate = {
            products: products,
            price: totalPrice,
        };

        return this.orderRepository.update(order, updateOrder);
    }

}
