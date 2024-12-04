import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/server.config'
import databaseConfig from './config/database.config'

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
