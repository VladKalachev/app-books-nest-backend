import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { TokenService } from 'src/auth/token/token.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: DatabaseService,
    private readonly tokenService: TokenService,
  ) {}

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

  async create(dto: CreateUserDto): Promise<ResponseCreateUserDto> {
    const hashPassword = await hash(dto.password, 3);
    const activationLink: string = uuidv4();

    const newUser = await this.prisma.users.create({
      data: {
        email: dto.email,
        password: hashPassword,
        activationLink,
      },
    });
    const tokens = this.tokenService.generateTokens(newUser);
    await this.tokenService.saveToken(newUser.id, tokens.refreshToken);

    return { ...tokens, user: newUser };
  }

  async remove() {}

  async update() {}

  async usersWithBooks() {}
}
