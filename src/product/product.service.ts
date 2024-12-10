import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Equal, LessThanOrEqual, Like } from 'typeorm';
import { AddProduct } from './dto/add.dto';
import { ProductRepository } from './repository/product.repository';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository, private analyticsService: AnalyticsService,
        private mailService: MailService
    ) { }

    async addProduct(addProduct: AddProduct) {
        addProduct.productName = addProduct.productName.charAt(0).toUpperCase() + addProduct.productName.slice(1).toLowerCase()
        const product = await this.productRepository.findOne(addProduct.productName)
        if (product) {
            throw new NotFoundException('Product already added');
        }
        const event = 'add'
        await this.mailService.setEmailType(event)
        await this.mailService.sendMail('user@gmail.com', 'Add new Product', `We added new product ${addProduct.productName}`)
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
        const event = 'update'
        await this.mailService.setEmailType(event)
        await this.mailService.sendMail('user@gmail.com', 'Update Product', `We updated product ${productName}`)

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

        await this.analyticsService.insertSearchLog(products, user);

        return products;
    }

}
