import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/user/entities/user.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ClickhouseService } from '../analytics/clickhouseanalytics.service';
import { ProductRepository } from './repository/product.repository';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]), RolesModule, AuthModule, AnalyticsModule],
  controllers: [ProductController],
  providers: [ProductService, ClickhouseService, ProductRepository]
})
export class ProductModule { }
