import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {
  TOKEN_NOT_FOUND,
  TOKEN_NOT_FOUND_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { TokenService } from './token/token.service';
import { ResponseUserDto } from 'src/user/dto/create-user.dto';
import { Users } from '@prisma/client';

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

    return user;
  }

  async login(user: Users): Promise<ResponseUserDto> {
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken: string) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND);
    }

    const user = await this.userService.findById(userData?.id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }
}
