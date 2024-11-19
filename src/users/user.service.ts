import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { userRegisterDto } from './dto/register.dto'
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async register(userRegister: userRegisterDto) {
        const email = userRegister.email
        const user = await this.repo.findOne({ where: { email } })
        if (user) {
            throw new NotFoundException(`User with email ${email} was register...!`);
        }
        const hashPassword = await bcrypt.hash(userRegister.password, 10)
        const newUser = this.repo.create({ ...userRegister, password: hashPassword })
        return this.repo.save(newUser)
    }

    async update(email: string, attr: Partial<User>) {
        const user = await this.repo.findOne({ where: { email } })
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found...!`);
        }
        if (attr.password) {
            const hashPassword = await bcrypt.hash(attr.password, 10)
            Object.assign(user, { ...attr, password: hashPassword })
        } else {
            Object.assign(user, attr)
        }
        return this.repo.save(user)
    }
}