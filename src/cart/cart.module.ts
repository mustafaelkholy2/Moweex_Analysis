import { forwardRef, Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { RolesModule } from 'src/roles/roles.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [RolesModule, forwardRef(() => OrderModule)],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule { }
