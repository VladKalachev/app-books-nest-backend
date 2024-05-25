import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { USER_NOT_FOUND_ERROR } from './user.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение списка Пользователей' })
  async all() {
    return this.userService.all();
  }

  @Get('usersWithBooks')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Пользователей с Книгами' })
  async usersWithBooks() {
    return this.userService.usersWithBooks();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Добавление новое Пользователя' })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Пользователя по id' })
  async one(@Param('id') id: number) {
    const user = await this.userService.findById(+id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return user;
  }

  async remove() {}

  async update() {}
}
