import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { OrderStatus } from './enum/status.enum';

@UseGuards(RolesGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @HttpCode(HttpStatus.OK)
    @Post('create')
    @Roles(UserRole.User)
    async createOrder(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.orderService.createOrder(req.user.email)
    }

    @HttpCode(HttpStatus.OK)
    @Post('update')
    @Roles(UserRole.User)
    async updateOrder(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.orderService.updateOrder(req.user.email)
    }


    @HttpCode(HttpStatus.OK)
    @Get('search')
    @Roles(UserRole.Admin)
    async getOrders(@Query() queries: Record<string, any>) {
        return this.orderService.find(queries)
    }
}
