import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { CartService } from './cart.service';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';

@UseGuards(RolesGuard)
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    @HttpCode(HttpStatus.OK)
    @Post('add')
    @Roles(UserRole.User)
    async addToCart(@Query() queries: Record<string, any>, @Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        if (!queries || Object.keys(queries).length === 0) {
            throw new UnauthorizedException('At least one query parameter is required');
        }

        this.cartService.addToCart(req.user.email, queries['productName'], queries['price'])
    }

    @HttpCode(HttpStatus.OK)
    @Delete('remove')
    @Roles(UserRole.User)
    async removeFromCart(@Query() queries: Record<string, any>, @Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        if (!queries || Object.keys(queries).length === 0) {
            throw new UnauthorizedException('At least one query parameter is required');
        }

        this.cartService.removeFromCart(req.user.email, queries['productName'])
    }

    @HttpCode(HttpStatus.OK)
    @Delete('clear')
    @Roles(UserRole.User)
    async clearCart(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        this.cartService.clearCart(req.user.email)
    }

    @HttpCode(HttpStatus.OK)
    @Get('open')
    @Roles(UserRole.User)
    async openCart(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        return this.cartService.getCart(req.user.email)
    }
}
