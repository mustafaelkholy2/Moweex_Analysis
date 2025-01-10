import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    client_Mail: string

    @Column("text", { array: true })
    products: string[]

    @Column("float", { nullable: true })
    price: number

    @Column({ type: 'enum', enum: ['canceled', 'shipped', 'completed'] })
    status: 'canceled' | 'shipped' | 'completed'

    @Column({ type: 'date' })
    orderDate: Date

    @Column()
    orderRate: number
}