import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersGateway, OrdersService],
  exports: [OrdersGateway, OrdersService],
})
export class OrdersModule {}
