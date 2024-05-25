import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GENRE_NOT_FOUND_ERROR } from './genre.constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение всего списка жанра книг' })
  async all(@Query('search') search: string) {
    return this.genreService.all(search);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Добавление нового Жанра' })
  async create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Жанра по id' })
  async one(@Param('id') id: number) {
    const author = await this.genreService.findById(+id);
    if (!author) {
      throw new NotFoundException(GENRE_NOT_FOUND_ERROR);
    }
    return author;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление Жанра по id' })
  async remove(@Param('id') id: number) {
    const deletedAuthor = await this.genreService.deleteById(+id);
    if (!deletedAuthor) {
      throw new NotFoundException(GENRE_NOT_FOUND_ERROR);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Редактирование Жанра по id' })
  async update(@Param('id') id: number, @Body() dto: CreateGenreDto) {
    const updatedAuthor = await this.genreService.updateById(+id, dto);
    if (!updatedAuthor) {
      throw new NotFoundException(GENRE_NOT_FOUND_ERROR);
    }
    return updatedAuthor;
  }
}
