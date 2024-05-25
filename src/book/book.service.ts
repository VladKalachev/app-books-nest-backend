import { Injectable } from '@nestjs/common';
import { Books } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BookService {
  constructor(private prisma: DatabaseService) {}

  async all(): Promise<Books[] | null> {
    return await this.prisma.books.findMany();
  }

  async getAllBooksByUserId(
    userId: number,
    search: string,
  ): Promise<Books[] | null> {
    return await this.prisma.books.findMany({
      where: {
        userId,
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOne(id: number): Promise<Books | null> {
    return await this.prisma.books.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any, fileName: string): Promise<Books> {
    const {
      title,
      description,
      genre,
      fullName,
      year,
      numberPages,
      publishing,
      notes,
      read,
      buy,
      userId,
      authorId,
      genreId,
      publishingId,
    } = data;

    return await this.prisma.books.create({
      data: {
        title,
        description,
        genre,
        fullName,
        image: fileName,
        year: read === 'true' ? year : null,
        numberPages:
          numberPages.split('"').length > 1
            ? Number(numberPages.split('"')[1])
            : numberPages,
        publishing,
        notes,
        read,
        buy,
        userId,
        authorId,
        genreId,
        publishingId,
      },
    });
  }

  async deleteById(id: number): Promise<Books> {
    const book = await this.prisma.books.findUnique({ where: { id } });
    if (!book) return;

    if (book) {
      await this.prisma.books.delete({ where: { id } });
    }
    return book;
  }

  async update(id: number, data: any, fileName: string) {
    const {
      title,
      description,
      genre,
      fullName,
      year,
      numberPages,
      publishing,
      notes,
      read,
      buy,
      authorId,
      genreId,
      publishingId,
    } = data;

    return await this.prisma.books.update({
      where: { id },
      data: {
        title,
        description,
        genre,
        fullName,
        image: fileName,
        year: read === 'true' ? year : null,
        numberPages:
          numberPages.split('"').length > 1
            ? Number(numberPages.split('"')[1])
            : numberPages,
        publishing,
        notes,
        read,
        buy,
        authorId,
        genreId,
        publishingId,
      },
    });
  }
}
