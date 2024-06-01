import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { TokenService } from 'src/auth/token/token.service';
import { FileService } from 'src/file/file.service';
import { BookService } from './book.service';
import { Response } from 'express';
import { TOKEN_NOT_FOUND_ERROR } from 'src/auth/auth.constants';
import { CreateBookDto } from './dto/create-book.dto';
import { BOOK_NOT_FOUND_ERROR } from './book.constants';
import { Cookies } from 'src/decorators/cookies.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TelegramUpdate } from 'src/telegram/telegram.update';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly fileService: FileService,
    private readonly tokenService: TokenService,
    private readonly telegramUpdate: TelegramUpdate,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение списка книг у Пользователя' })
  @ApiQuery({ name: 'search', required: false })
  async all(
    @Cookies('refreshToken') refreshToken: string,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Query('search') search?: string,
  ) {
    try {
      const userData = this.tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
      }
      const books = await this.bookService.getAllBooksByUserId(
        userData.id,
        search,
      );
      return res.json(books);
    } catch (e) {
      next(e);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Добавление книги в коллекцию у пользователя' })
  async create(
    @Body() dto: CreateBookDto,
    @Cookies('refreshToken') refreshToken: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userData = this.tokenService.validateRefreshToken(refreshToken);

      // TODO перенести в validateRefreshToken
      if (!userData) {
        throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
      }

      const book = await this.bookService.create(dto, userData);

      this.telegramUpdate.sendMessage(
        `Добавлена новая книга ${book.title}: ${book.description}`,
      );
      return res.json(book);
    } catch (e) {
      next(e);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Книги по id' })
  async one(@Param('id') id: number) {
    const book = await this.bookService.findOne(+id);
    if (!book) {
      throw new NotFoundException(BOOK_NOT_FOUND_ERROR);
    }
    return book;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление Книги по id' })
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const fileName = 'default.png';
      const book = await this.bookService.deleteById(+id);
      if (book && book.image !== fileName) {
        await this.fileService.deleteFile(book.image);
      }
      res.json(true);
    } catch (e) {
      next(e);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Обновление Книги по id' })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateBookDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const book = await this.bookService.update(+id, dto);

      return res.json(book);
    } catch (e) {
      next(e);
    }
  }
}
