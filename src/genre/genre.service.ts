import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Genres } from '@prisma/client';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(private prisma: DatabaseService) {}

  async all(): Promise<Genres[] | null> {
    return this.prisma.genres.findMany();
  }

  async create(dto: CreateGenreDto): Promise<Genres> {
    return this.prisma.genres.create({ data: dto });
  }

  async findById(id: number): Promise<Genres | null> {
    return this.prisma.genres.findUnique({
      where: { id },
    });
  }

  async deleteById(id: number): Promise<Genres> {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.genres.delete({
      where: { id },
    });
  }

  async updateById(id: number, dto: CreateGenreDto): Promise<Genres | null> {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.genres.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
