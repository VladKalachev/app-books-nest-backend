import { Controller } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  async all() {}

  async create() {}

  async one() {}

  async remove() {}

  async update() {}
}
