import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";
import { AddProduct } from "../dto/add.dto";

@Injectable()
export class ProductRepository {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    findAll(conditions: Record<string, any>) {
        return this.productRepository.find({
            where: conditions,
        });
    }

    findOne(productName: string) {
        return this.productRepository.findOne({ where: { productName } })
    }

    create(product: AddProduct) {
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }

    update(product: Product, attr: Partial<Product>) {
        Object.assign(product, attr)
        return this.productRepository.save(product);
    }

    delete(product: Product) {
        return this.productRepository.remove(product)
    }
}