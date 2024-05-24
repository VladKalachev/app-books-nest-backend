import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @IsEmail(undefined, { message: 'Email некорректный' })
  email: string;

  @IsString()
  @MinLength(4, { message: 'Пароль не должен быть меньше 4 символов' })
  @MaxLength(20, { message: 'Пароль должен быть меньше 20 символов' })
  password: string;
}
