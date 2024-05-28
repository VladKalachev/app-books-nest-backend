import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Authors } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: DatabaseService) {}

  async all(search?: string): Promise<Authors[] | null> {
    return this.prisma.authors.findMany({
      where: {
        fullName: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(dto: CreateAuthorDto): Promise<Authors> {
    return this.prisma.authors.create({ data: dto });
  }

  async findById(id: number): Promise<Authors | null> {
    return this.prisma.authors.findUnique({
      where: { id },
    });
  }

  async deleteById(id: number): Promise<Authors> {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.authors.delete({
      where: { id },
    });
  }

  async updateById(id: number, dto: CreateAuthorDto) {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.authors.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
