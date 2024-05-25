import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import {
  HEADER_IS_EMPTY,
  TOKEN_INVALID_ERROR,
  TOKEN_IS_EMPTY,
} from '../auth.constants';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(HEADER_IS_EMPTY);
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(TOKEN_IS_EMPTY);
    }

    try {
      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      request.user = userData;
      return true;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_INVALID_ERROR);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
