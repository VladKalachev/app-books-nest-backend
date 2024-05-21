import { Users } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password: string;
}

export class ResponseCreateUserDto {
  user: Users;
  accessToken: string;
  refreshToken: string;
}
