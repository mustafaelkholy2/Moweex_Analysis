import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { OrderStatus } from "../enum/status.enum";

export class AddOrder {
    @IsEmail()
    client_Mail: string

    @IsNumber()
    price: number

    @IsEnum(OrderStatus)
    status: OrderStatus

    @IsString()
    products: string[]

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    orderRate?: number

    @IsDate()
    orderDate: string
}