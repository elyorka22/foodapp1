import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { AppRole } from '../../../common/constants/roles';

export class RegisterDto {
  @ApiProperty({ example: '+998901112233' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'MyPassword123' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ enum: AppRole, example: AppRole.USER })
  @IsEnum(AppRole)
  role: AppRole = AppRole.USER;
}
