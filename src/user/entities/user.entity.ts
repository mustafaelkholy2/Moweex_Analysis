import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    userName: string;

    @Column({ type: 'varchar', length: 50 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    @Exclude()
    password: string

    @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
    role: 'admin' | 'user'
}