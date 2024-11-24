import { Module } from "@nestjs/common";
import { RolesGuard } from "./roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: 'Secret_Key_Is_Used_To_Create_Token'
    })],
    providers: [{
        provide: APP_GUARD,
        useClass: RolesGuard
    }]
})

export class RolesModule { }