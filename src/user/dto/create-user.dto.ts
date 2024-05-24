import { Users } from '@prisma/client';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(4, { message: 'Пароль не должен быть меньше 4 символов' })
  @MaxLength(20, { message: 'Пароль должен быть меньше 20 символов' })
  password: string;
}

export class ResponseUserDto {
  user: Users;
  accessToken: string;
  refreshToken: string;
}
