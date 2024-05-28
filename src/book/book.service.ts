import { Injectable } from '@nestjs/common';
import { Books, Users } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDto } from './dto/create-book.dto';

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

  async create(data: CreateBookDto, user: Users): Promise<Books> {
    const fileName = 'default.png';

    return await this.prisma.books.create({
      data: {
        title: data.title,
        description: data.description,
        year: data.read === true ? data.year : null,
        numberPages: data.numberPages,
        notes: data.notes,
        read: data.read,
        buy: data.buy,
        Author:
          data.authorId !== null
            ? { connect: { id: data.authorId } }
            : undefined,
        Genre:
          data.genreId !== null ? { connect: { id: data.genreId } } : undefined,
        Publishing:
          data.publishingId !== null
            ? { connect: { id: data.publishingId } }
            : undefined,
        image: data.image ? data.image : fileName,
        fullName: data.fullName,
        genre: data.genre,
        publishing: data.publishing,
        User: { connect: { id: user.id } },
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

  async update(id: number, data: CreateBookDto) {
    const fileName = 'default.png';

    return await this.prisma.books.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        genre: data.genre,
        fullName: data.fullName,
        Author:
          data.authorId !== null
            ? { connect: { id: data.authorId } }
            : undefined,
        Genre:
          data.genreId !== null ? { connect: { id: data.genreId } } : undefined,
        Publishing:
          data.publishingId !== null
            ? { connect: { id: data.publishingId } }
            : undefined,
        image: data.image ? data.image : fileName,
        year: data.read === true ? data.year : null,
        numberPages: data.numberPages,
        publishing: data.publishing,
        notes: data.notes,
        read: data.read,
        buy: data.buy,
      },
    });
  }
}
