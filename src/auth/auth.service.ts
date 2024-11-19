import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "../users/entities/user.entity"
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    private generateToken(user: User) {
        const payload = { email: user.email, id: user.id, isAdimn: user.isAdmin }
        const secretKey = `user${user.id}`
    }

    async login(email: string, password: string) {
        const user = await this.repo.findOne({ where: { email } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const isMatchingPass = await bcrypt.compare(password, user.password)

        if (!isMatchingPass) {
            throw new UnauthorizedException('Invalid credentials')
        }


    }
}