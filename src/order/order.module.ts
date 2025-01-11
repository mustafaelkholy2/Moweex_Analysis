import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CartModule } from 'src/cart/cart.module';
import { RolesModule } from 'src/roles/roles.module';
import { OrderRepository } from './repository/order.repository';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), forwardRef(() => CartModule), RolesModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService]
})
export class OrderModule { }
