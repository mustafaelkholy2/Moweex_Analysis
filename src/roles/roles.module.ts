import { Module } from "@nestjs/common";
import { RolesGuard } from "./roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtGlobalModule } from "src/auth/jwt.module";

@Module({
    imports: [
        JwtGlobalModule
    ],
    providers: [{
        provide: APP_GUARD,
        useClass: RolesGuard
    }]
})

export class RolesModule { }