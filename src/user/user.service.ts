import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async all(): Promise<Users[] | null> {
    return this.prisma.users.findMany();
  }

  async findOne(email: string): Promise<Users | null> {
    return this.prisma.users.findFirst({
      where: { email },
    });
  }

  async findById(id: number): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateUserDto): Promise<Users> {
    const hashPassword = await hash(dto.password, 3);
    const activationLink: string = uuidv4();

    const data = {
      email: dto.email,
      password: hashPassword,
      activationLink,
    };

    return this.prisma.users.create({ data });
  }

  async remove() {}

  async update() {}
}
