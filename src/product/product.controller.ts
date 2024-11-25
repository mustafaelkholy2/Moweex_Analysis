import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { AddProduct } from './dto/add.dto';
import { productUpdate } from './dto/update.dto';

@UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @HttpCode(HttpStatus.OK)
    @Post('add')
    @Roles(UserRole.Admin)
    async addProduct(@Body() addProduct: AddProduct, @Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.productService.addProduct(addProduct);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('edit')
    @Roles(UserRole.Admin)
    async updateProduct(@Body() updateProduct: productUpdate, @Request() req, @Query('productName') productName: string) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.productService.updateProduct(productName, updateProduct);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    @Roles(UserRole.Admin)
    async deleteProduct(@Query('productName') productName: string, @Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.productService.deleteProduct(productName);
    }

    @HttpCode(HttpStatus.OK)
    @Get('search')
    @Roles(UserRole.User)
    async search(@Query() queries: Record<string, any>, @Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        if (!queries || Object.keys(queries).length === 0) {
            throw new UnauthorizedException('At least one query parameter is required');
        }

        return this.productService.search(queries, req.user)
    }
}

