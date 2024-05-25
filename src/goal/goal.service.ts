import { Injectable } from '@nestjs/common';
import { Goals } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class GoalService {
  constructor(private readonly prisma: DatabaseService) {}

  async all(search?: string, limit: number = 10000): Promise<Goals[] | null> {
    return this.prisma.goals.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  async getAllGoalsByUserId(
    userId: number,
    search?: string,
  ): Promise<Goals[] | null> {
    return this.prisma.goals.findMany({
      where: {
        userId: userId,
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(data: CreateGoalDto): Promise<Goals> {
    return this.prisma.goals.create({
      data,
    });
  }

  async findById(id: number): Promise<Goals | null> {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.goals.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteById(id: number): Promise<Goals> {
    const response = await this.findById(id);
    if (!response) return;

    await this.prisma.goals.delete({
      where: {
        id,
      },
    });
  }

  async updateById(id: number, data: CreateGoalDto): Promise<Goals | null> {
    const response = await this.findById(id);
    if (!response) return;

    return this.prisma.goals.update({
      where: {
        id,
      },
      data,
    });
  }

  async completed(id: number, completed: boolean): Promise<Goals> {
    const goal = await this.prisma.goals.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    if (goal.bookId) {
      await this.prisma.books.update({
        where: {
          id: goal.bookId,
        },
        data: {
          read: completed,
        },
      });
    }

    return goal;
  }
}
