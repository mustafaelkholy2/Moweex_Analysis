import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Equal, FindOptionsWhere, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { AddProduct } from './dto/add.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>, private authService: AuthService) { }

    async addProduct(addProduct: AddProduct) {
        const product = await this.repo.findOne({ where: { productName: addProduct.productName } });

        if (product) {
            throw new NotFoundException('Product already added');
        }

        const newProduct = this.repo.create(addProduct);
        return await this.repo.save(newProduct);
    }

    async updateProduct(productName: string, attr: Partial<Product>) {
        const product = await this.repo.findOne({ where: { productName } });

        if (!product) {
            throw new NotFoundException(`Product with Name ${productName} not found`);
        }

        Object.assign(product, { ...attr })
        return await this.repo.save(product)
    }

    async deleteProduct(productName: string) {
        const product = await this.repo.findOne({ where: { productName } });

        if (!product) {
            throw new NotFoundException(`Product with Name ${productName} not found`);
        }

        return await this.repo.remove(product)
    }

    async search(queries: Record<string, string>) {
        const conditions: any = {};

        Object.entries(queries).forEach(([key, value]) => {
            if (key === 'price') {
                conditions[key] = LessThanOrEqual(parseFloat(value));
            } else if (key === 'role') {
                conditions[key] = Equal(value as 'available' | 'unavailable');
            } else {
                conditions[key] = Like(`%${value}%`);
            }
        });

        const products = await this.repo.find({
            where: conditions,
        });

        console.log(conditions);

        if (products.length === 0) {
            throw new NotFoundException(`No products found matching your criteria`);
        }

        return products;
    }


}
