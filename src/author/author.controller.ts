import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AUTHOR_NOT_FOUND_ERROR } from './author.constants';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async all() {
    return this.authorService.all();
  }

  @Post('create')
  async create(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }

  @Get(':id')
  async one(@Param('id') id: number) {
    const author = await this.authorService.findById(+id);
    console.log(author);
    if (!author) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }
    return author;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deletedAuthor = await this.authorService.deleteById(+id);

    if (!deletedAuthor) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateAuthorDto) {
    const updatedAuthor = await this.authorService.updateById(+id, dto);
    if (!updatedAuthor) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }
    return updatedAuthor;
  }
}
