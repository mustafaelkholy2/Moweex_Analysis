import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    productName: string;

    @Column()
    price: number

    @Column({ type: 'enum', enum: ['available', 'unavailable'], default: 'available' })
    role: 'available' | 'unavailable'

    @Column()
    description: string
}