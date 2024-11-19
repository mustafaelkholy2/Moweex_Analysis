import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/
export class userRegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: 'Name must have atleast 5 characters.' })
    userName: string

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email' })
    email: string

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character` })
    password: string
}