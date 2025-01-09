import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { OrderStatus } from "../enum/status.enum";

export class AddOrder {
    @IsEmail()
    @IsNotEmpty()
    client_Mail: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus

    @IsString()
    @IsNotEmpty()
    products: string[]
}