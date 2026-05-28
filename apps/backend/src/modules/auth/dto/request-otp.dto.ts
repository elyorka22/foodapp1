import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty({ example: '+998901112233' })
  @IsPhoneNumber()
  phone!: string;
}
