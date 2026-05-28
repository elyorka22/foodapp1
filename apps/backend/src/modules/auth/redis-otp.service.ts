import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisOtpService implements OnModuleDestroy {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  async saveOtp(phone: string, otpCode: string, ttlSeconds = 120): Promise<void> {
    await this.redisClient.set(this.buildKey(phone), otpCode, 'EX', ttlSeconds);
  }

  async getOtp(phone: string): Promise<string | null> {
    return this.redisClient.get(this.buildKey(phone));
  }

  async deleteOtp(phone: string): Promise<void> {
    await this.redisClient.del(this.buildKey(phone));
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  private buildKey(phone: string): string {
    return `otp:${phone}`;
  }
}
