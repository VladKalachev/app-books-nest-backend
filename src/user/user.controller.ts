import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { USER_NOT_FOUND_ERROR } from './user.constants';

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
  async usersWithBooks() {}

  async create() {}

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
