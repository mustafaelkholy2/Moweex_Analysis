// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Order } from "../entities/order.entity";
// import { Repository } from "typeorm";
// import { AddOrder } from "../dto/add.dto";

// @Injectable()
// export class OrderRepository {
//     constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }

//     find(conditions: Record<string, any>) {
//         return this.orderRepository.find({ where: conditions })
//     }

//     addOrder(order: AddOrder) {
//         const newOrder = this.orderRepository.create(order)
//         return this.orderRepository.save(newOrder)
//     }

//     update(order: Order, attr: Partial<Order>) {
//         Object.assign(order, attr)
//         return this.orderRepository.save(order)
//     }

//     delete() {

//     }
// }