import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { userRegisterDto } from "../dto/register.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    findOne(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    create(userRegister: userRegisterDto) {
        const newUser = this.userRepository.create(userRegister)
        return this.userRepository.save(newUser)
    }

    update(user: User, attr: Partial<User>) {
        Object.assign(user, attr)
        return this.userRepository.save(user)
    }

    delete(user: User) {
        return this.userRepository.remove(user)
    }
}