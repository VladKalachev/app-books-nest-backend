import { Controller } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  async all() {}

  async create() {}

  async one() {}

  async remove() {}

  async update() {}
}
