import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { USER_NOT_FOUND_ERROR } from './user.constants';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка Пользователей' })
  async all() {
    return this.userService.all();
  }

  @Get('usersWithBooks')
  @ApiOperation({ summary: 'Получение Пользователей с Книгами' })
  async usersWithBooks() {
    return this.userService.usersWithBooks();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @ApiOperation({ summary: 'Добавление новое Пользователя' })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get(':id')
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
