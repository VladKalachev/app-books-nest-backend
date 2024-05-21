import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  Req,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  async register(@Body() dto: AuthDto, @Res() res: Response) {
    const oldUser = await this.userService.findOne(dto.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const userData = await this.userService.create(dto);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
    });
    return res.json(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Логин пользователя' })
  async login(@Body() dto: AuthDto, @Res() res: Response) {
    const user = await this.authService.validateUser(dto);
    const userData = await this.authService.login(user);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    });
    return res.json(userData);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Разлогин пользователя' })
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json(token);
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Рефрешь токена' })
  async refresh() {}

  @Post('activate/:link')
  @ApiOperation({ summary: 'Активация пользователя по ссылки' })
  async activate(@Param('link') activationLink: string, @Res() res: Response) {
    await this.userService.activate(activationLink);
    return res.redirect(this.configService.get('CLIENT_URL') || '');
  }
}
