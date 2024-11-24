import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { UserRole } from "./roles.enum";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);


        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new ForbiddenException('Token not found');
        }

        try {
            const user = this.jwtService.verify(token, { secret: 'Secret_Key_Is_Used_To_Create_Token' });
            request.user = user;
            if (!user || !user.role) {
                throw new ForbiddenException('User role not found');
            }
            return requiredRoles.some((role) => user.role?.includes(role));
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }


    }

}