import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Equal, LessThanOrEqual, Like, Repository } from 'typeorm';
import { AddProduct } from './dto/add.dto';
import { ClickhouseService } from './clickhouse.service';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository, private clickhouseService: ClickhouseService,) { }

    async addProduct(addProduct: AddProduct) {
        addProduct.productName = addProduct.productName.charAt(0).toUpperCase() + addProduct.productName.slice(1).toLowerCase()
        const product = await this.productRepository.findOne(addProduct.productName)
        if (product) {
            throw new NotFoundException('Product already added');
        }
        return this.productRepository.create(addProduct)
    }

    async updateProduct(productName: string, attr: Partial<Product>) {
        productName = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase()
        const product = await this.productRepository.findOne(productName)
        if (attr.productName) {
            attr.productName = attr.productName.charAt(0).toUpperCase() + attr.productName.slice(1).toLowerCase()
        }

        if (!product) {
            throw new NotFoundException(`Product with Name ${productName} not found`);
        }

        return this.productRepository.update(product, attr)
    }

    async deleteProduct(productName: string) {
        const product = await this.productRepository.findOne(productName)

        if (!product) {
            throw new NotFoundException(`Product with Name ${productName} not found`);
        }

        return this.productRepository.delete(product)
    }

    async search(queries: Record<string, string>, user: any) {
        const conditions: Record<string, any> = {};
        const now = new Date();
        const search_date = now.toISOString().slice(0, 19).replace('T', ' '); // "yyyy-MM-dd HH:mm:ss"


        Object.entries(queries).forEach(([key, value]) => {
            if (key === 'price') {
                conditions[key] = LessThanOrEqual(parseFloat(value));
            } else if (key === 'role') {
                conditions[key] = Equal(value as 'available' | 'unavailable');
            } else {
                value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
                conditions[key] = Like(`%${value}%`);
            }
        });

        const products = await this.productRepository.findAll(conditions)

        if (products.length === 0) {
            throw new NotFoundException('No products found matching your criteria');
        }

        const searchLogs = products.map(product => ({
            product_name: product.productName,
            user_id: user.id,
            user_email: user.email,
            search_date: search_date,
        }));

        await this.clickhouseService.insertSearchLog(searchLogs);

        return products;
    }

}
