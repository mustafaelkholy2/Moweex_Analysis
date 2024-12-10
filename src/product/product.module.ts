import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/user/entities/user.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]), RolesModule, AnalyticsModule, MailModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository]
})
export class ProductModule { }
