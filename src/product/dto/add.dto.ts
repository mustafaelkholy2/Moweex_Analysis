import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { ProductRoles } from "../enum/role.enum";
import { ProductCategories } from "../enum/category.enum";

export class AddProduct {
    @IsString()
    @IsNotEmpty()
    productName: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsEnum(ProductRoles, { message: 'Role must be either "available" or "unavailable".' })
    @IsNotEmpty()
    role: ProductRoles

    @IsString()
    @MinLength(10, { message: 'description must have at least 10 characters.' })
    @MaxLength(50, { message: 'description must have at most 10 characters.' })
    @IsNotEmpty()
    description: string

    @IsEnum(ProductCategories)
    @IsNotEmpty()
    category: ProductCategories
}