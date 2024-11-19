import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    userName: string;

    @Column({ type: 'varchar', length: 40 })
    email: string

    @Column({ type: 'varchar', length: 20 })
    @Exclude()
    password: string

    @Column({ type: 'boolean' })
    isAdmin: boolean
}