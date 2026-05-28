import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AppRole } from '../../common/constants/roles';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { OrdersService } from './orders.service';

class UpdateStatusDto {
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}

class UpdateLocationDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}

@ApiTags('Orders')
@Controller({ path: 'orders', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Patch(':orderId/status')
  @Roles(AppRole.ADMIN, AppRole.RESTAURANT, AppRole.COURIER)
  @ApiOperation({ summary: 'Update order status and emit realtime event' })
  updateStatus(@Param('orderId') orderId: string, @Body() dto: UpdateStatusDto) {
    return this.ordersService.updateOrderStatus(orderId, dto.status);
  }

  @Patch(':orderId/courier-location')
  @Roles(AppRole.COURIER)
  @ApiOperation({ summary: 'Update courier location and emit realtime event' })
  updateCourierLocation(@Param('orderId') orderId: string, @Body() dto: UpdateLocationDto) {
    return this.ordersService.updateCourierLocation(orderId, dto.latitude, dto.longitude);
  }
}
