import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AUTHOR_NOT_FOUND_ERROR } from './author.constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение всего списка авторов книг' })
  async all() {
    return this.authorService.all();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Добавление нового автора' })
  async create(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение автора по id' })
  async one(@Param('id') id: number) {
    const author = await this.authorService.findById(+id);
    if (!author) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }
    return author;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление автора по id' })
  async remove(@Param('id') id: number) {
    const deletedAuthor = await this.authorService.deleteById(+id);
    if (!deletedAuthor) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Редактирование автора по id' })
  async update(@Param('id') id: number, @Body() dto: CreateAuthorDto) {
    const updatedAuthor = await this.authorService.updateById(+id, dto);
    if (!updatedAuthor) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }
    return updatedAuthor;
  }
}
