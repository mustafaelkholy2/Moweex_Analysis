import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
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

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    orderRate: number

    @IsDate()
    orderDate: Date
}