import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    try {
      const user = this.jwtService.verify(token, { secret: this.configService.get<string>('secretKey') });
      request.user = user;
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
