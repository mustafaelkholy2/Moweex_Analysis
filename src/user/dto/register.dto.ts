import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { UserRole } from "../../roles/roles.enum";

const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/

export class userRegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: 'Name must have at least 5 characters.' })
    userName: string

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email' })
    email: string

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character` })
    password: string

    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'Role must be either "admin" or "user".' })
    role: UserRole
}