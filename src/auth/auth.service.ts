import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(dto: AuthDto) {
    const user = await this.userService.findOne(dto.email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(dto.password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
  }

  async login() {}

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);
  }
}
