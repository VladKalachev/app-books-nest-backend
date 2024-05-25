import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Publishing } from '@prisma/client';
import { CreatePublishingDto } from './dto/create-publishing.dto';

@Injectable()
export class PublishingService {
  constructor(private prisma: DatabaseService) {}

  async all(search: string): Promise<Publishing[] | null> {
    return this.prisma.publishing.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(dto: CreatePublishingDto): Promise<Publishing> {
    return this.prisma.publishing.create({ data: dto });
  }

  async findById(id: number): Promise<Publishing | null> {
    return this.prisma.publishing.findUnique({
      where: { id },
    });
  }

  async deleteById(id: number): Promise<Publishing> {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.publishing.delete({
      where: { id },
    });
  }

  async updateById(id: number, dto: CreatePublishingDto) {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.publishing.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
