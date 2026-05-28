import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(OrdersGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Socket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Socket disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-order-room')
  joinOrderRoom(@ConnectedSocket() client: Socket, @MessageBody() body: { orderId: string }) {
    client.join(`order:${body.orderId}`);
    return { joined: true, orderId: body.orderId };
  }

  @SubscribeMessage('leave-order-room')
  leaveOrderRoom(@ConnectedSocket() client: Socket, @MessageBody() body: { orderId: string }) {
    client.leave(`order:${body.orderId}`);
    return { left: true, orderId: body.orderId };
  }

  emitOrderStatusUpdate(orderId: string, status: string) {
    this.server.to(`order:${orderId}`).emit('order-status-updated', {
      orderId,
      status,
      updatedAt: new Date().toISOString(),
    });
  }

  emitCourierLocation(orderId: string, latitude: number, longitude: number) {
    this.server.to(`order:${orderId}`).emit('courier-location-updated', {
      orderId,
      latitude,
      longitude,
      updatedAt: new Date().toISOString(),
    });
  }
}
