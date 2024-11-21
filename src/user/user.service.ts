import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { userRegisterDto } from './dto/register.dto'
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private authService: AuthService) { }

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
        const secretKey = 'Secret_Key_Is_Used_To_Create_Token';
        const payload = { id: user.id, userName: user.userName, role: user.role };
        return { token: this.authService.generateToken(payload, secretKey) };
    }

    async update(email: string, attr: Partial<User>) {
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        if (attr.password) {
            const hashPassword = await this.authService.hashPassword(attr.password);
            Object.assign(user, { ...attr, password: hashPassword });
        } else {
            Object.assign(user, attr);
        }
        return this.repo.save(user);
    }
}
