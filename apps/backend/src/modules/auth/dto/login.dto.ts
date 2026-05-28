import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '+998901112233' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ example: 'MyPassword123' })
  @IsString()
  @MinLength(8)
  password!: string;
}
