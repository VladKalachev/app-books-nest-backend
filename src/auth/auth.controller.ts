import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
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

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    await this.authService.validateUser(dto);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiBearerAuth()
  async logout() {
    // get cookies
    await this.authService.login();
  }

  @Get('refresh')
  async refresh() {}

  @Post('activate/:link')
  async activate() {}
}
