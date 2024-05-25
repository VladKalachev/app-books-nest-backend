import {
  Controller,
  Get,
  Next,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { TokenService } from 'src/auth/token/token.service';
import { FileService } from 'src/file/file.service';
import { BookService } from './book.service';
import { Request, Response } from 'express';
import { TOKEN_NOT_FOUND_ERROR } from 'src/auth/auth.constants';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly fileService: FileService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async all(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const query = req.query;

      const userData: any =
        this.tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
      }
      const books = await this.bookService.getAllBooksByUserId(
        userData.id,
        query,
      );
      return res.json(books);
    } catch (e) {
      next(e);
    }
  }

  async create() {}

  async one() {}

  async remove() {}

  async update() {}
}
