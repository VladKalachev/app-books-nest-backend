import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Token, Users } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TokenService {
  constructor(
    private prisma: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(payload: Users) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '30m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.prisma.token.findUnique({ where: { userId } });
    if (tokenData) {
      return await this.prisma.token.update({
        where: { userId },
        data: { refreshToken },
      });
    }
    return await this.prisma.token.create({
      data: { userId, refreshToken },
    });
  }

  async removeToken(refreshToken: string) {
    return await this.prisma.token.deleteMany({
      where: { refreshToken },
    });
  }

  validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken: string): Promise<Token | null> {
    return await this.prisma.token.findFirst({
      where: { refreshToken },
    });
  }
}
