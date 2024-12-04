import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('secretKey'),
                signOptions: {
                    expiresIn: configService.get<string>('jwtExpiration'),
                },
            }),
        }),
    ],
    exports: [JwtModule],
})
export class JwtGlobalModule { }
