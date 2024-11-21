import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { userRegisterDto } from './dto/register.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() user: userRegisterDto) {
        return this.userService.register(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() body: { email: string, password: string }) {
        return this.userService.login(body.email, body.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return req.user;
    }
}
