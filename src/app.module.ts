import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1980',
      username: 'postgres',
      entities: [User],
      database: 'nestWithPostgres',
      synchronize: true,
      logging: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
