import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { userRegisterDto } from './dto/register.dto'
import { AuthService } from "src/auth/auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private authService: AuthService, private configService: ConfigService) { }

    async register(userRegister: userRegisterDto) {
        const email = userRegister.email;
        const user = await this.repo.findOne({ where: { email } });
        if (user) {
            throw new NotFoundException('User already registered');
        }
        const hashPassword = await this.authService.hashPassword(userRegister.password);
        const newUser = this.repo.create({ ...userRegister, password: hashPassword });
        return this.repo.save(newUser);
    }

    async login(email: string, password: string) {
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not registered');
        }
        const validatePassword = await this.authService.validatePassword(password, user.password);
        if (!validatePassword) {
            throw new UnauthorizedException('Password is incorrect');
        }
        const secretKey = this.configService.get<string>('secretKey');
        const payload = { id: user.id, userName: user.userName, role: user.role, email: user.email };
        return { token: this.authService.generateToken(payload, secretKey) };
    }

    async update(email: string, attr: Partial<User>) {
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        if (attr.password) {
            if (!(await this.authService.validatePassword(attr.password, user.password))) {
                const hashPassword = await this.authService.hashPassword(attr.password);
                Object.assign(user, { ...attr, password: hashPassword });
            } else {
                throw new NotFoundException(`This password is the same as the old password.`);
            }


        } else {
            Object.assign(user, attr);
        }
        return this.repo.save(user);
    }

    async delete(reqUser: any, password: string) {
        const { email } = reqUser;
        console.log(password)
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        if (!user.password) {
            throw new InternalServerErrorException('User password is missing.');
        }

        if (!password || typeof password !== 'string') {
            throw new BadRequestException('Password must be a valid string.');
        }
        const validatePassword = await this.authService.validatePassword(password, user.password);
        if (!validatePassword) {
            throw new UnauthorizedException('Password is incorrect');
        }

        return this.repo.remove(user)
    }
}
