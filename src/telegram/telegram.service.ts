import { Injectable } from '@nestjs/common';
import { Books } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TelegramService {
  constructor(private prisma: DatabaseService) {}

  async findBookByName(search: string): Promise<Books[] | null> {
    return await this.prisma.books.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }
}
